import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {request_crate} from "@/store/http/requests";

import queries from "@/store/http/queries";

import {use_global_store} from "@/store/global_store";
import {use_log_store} from "@/store/log";
import {Privilege, Users} from "@/store/crate_api/users";

export const use_users_store = defineStore('users', () => {
  const state = reactive({
    current_open_user: null,
    users: new Users([]),
    current_user_name: null,
    response_from_add_permissions: {
      type: null,
      title: '',
      subtitle: ''
    }
  })
  const global_store = use_global_store()
  const log_store = use_log_store()

  async function update_users() {
    const _response = await request_crate(queries.USERS)
    const data = await _response.json()
    state.users = new Users(data.rows)
  }

  async function update_current_user() {
    const _response = await request_crate(queries.CURRENT_USER)
    const data = await _response.json()
    state.current_user_name = data.rows[0][0]
  }

  async function revoke_permission(permission) {
    const {type, class_, ident, id} = permission
    const _response = await request_crate(queries.REVOKE, null,
        {
          '%permission': type,
          '%type': class_,
          '%ident': ident,
          '%to': state.current_open_user.name
        })

    if (_response.ok) {
      // We locally remove the privilege, so it updates automatically the row in the permissions table.
      const table_index = state.current_open_user.privileges.findIndex((el) => el.id === id)
      state.current_open_user.privileges.splice(table_index, 1)

      global_store.show_successful_snackbar('Permission revoked successfully')
      await log_store.log(log_store.ACTIONS.REVOKED_PERMISSION, JSON.stringify(permission))

    } else {
      global_store.show_error_snackbar('Something went wrong!')
    }
  }

  async function drop_user() {
      const response = await request_crate(
          queries.DROP_USER,
          null,
          {'%user_name': state.current_open_user.name}
      )

      if (response.ok) {
          await log_store.log(log_store.ACTIONS.USER_DELETED, state.current_open_user.name)
          state.current_open_user = null
      }
      return response
  }

  async function create_user(username, password) {
    const response = await request_crate(
        password != null && password !== '' ? queries.CREATE_USER : queries.CREATE_USER_WITHOUT_PASSWORD,
        null,
        {
          '%username': username,
          '%password': password
        })

    if (response.ok) {
      await log_store.log(log_store.ACTIONS.USER_CREATED, username)
    }
    return response
  }

  async function alter_user(new_password) {
    const _response = await request_crate(queries.ALTER_USER, null, {
      '%username': state.current_open_user.name,
      '%password': new_password
    })
    if (_response.ok) {
      return {
        type: 'success',
        title: 'Success!',
      }
    } else {
      const data = await _response.json()
      return {
        type: 'error',
        title: 'Error',
        subtitle: data.error.message
      }
    }
  }

  async function add_permission_to_user(params, user) {
    const new_id = state.current_open_user.privileges[state.current_open_user.privileges.length - 1].id
    const class_ = params.on
    const grantee = state.current_open_user.name
    const grantor = state.current_user_name
    let ident = ''
    const state_ = params.type
    const type = params.permission
    if (params.on === 'cluster') {
      ident = ''
    } else {
      if (params.schema != null) {
        ident += params.schema
      }
      if (params.table != null) {
        ident += '.'
        ident += params.table
      }
    }

    const new_privilege = new Privilege(new_id, class_, grantee, grantor, ident, state_, type)
    user.privileges.push(new_privilege)

  }
  async function add_privilege(stmt, privilege_params) {
    const response = await request_crate(stmt)
    if (response.ok) {
      await add_permission_to_user(privilege_params, state.current_open_user)
    }
    return response
  }

  return {
    ...toRefs(state),
    add_privilege,
    create_user,
    alter_user,
    drop_user,
    revoke_permission,
    update_users,
    update_current_user
  }
})
