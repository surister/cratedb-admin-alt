import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {request_crate} from "@/store/http/requests";

import queries from "@/store/http/queries";

import {use_global_store} from "@/store/global_store";
import {use_log_store} from "@/store/log";

export const use_users_store = defineStore('users', () => {
  const state = reactive({
    current_open_user: null,
    response_from_add_permissions: {
      type: null,
      title: '',
      subtitle: ''
    }
  })
  const global_store = use_global_store()
  const log_store = use_log_store()

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
    const _response = await request_crate(
        queries.DROP_USER,
        null,
        {'%user_name': state.current_open_user.name}
    )

    if (_response.ok) {
      global_store.show_successful_snackbar('User deleted correctly')
      await log_store.log(log_store.ACTIONS.USER_DELETED, state.current_open_user.name)
      state.current_open_user = null
    } else {
      global_store.show_error_snackbar("Something went wrong, could not delete user!")
    }
  }

  async function create_user(username, password) {
    const _response = await request_crate(
        password != null && password !== '' ? queries.CREATE_USER : queries.CREATE_USER_WITHOUT_PASSWORD,
        null,
        {
          '%username': username,
          '%password': password
        })
    if (_response.ok) {
      global_store.show_successful_snackbar('Successfully created user')
      await log_store.log(log_store.ACTIONS.USER_CREATED, username)
    } else {
      const data = await _response.json()
      const err_message = data.error.message
      global_store.show_error_snackbar(err_message)
    }
  }

  async function alter_user(new_password) {
    const _response = await request_crate(queries.ALTER_USER, null, {
      '%username': state.current_open_user.name,
      '%password': new_password
    })

    if (_response.ok) {
      await global_store.show_successful_snackbar('Altered correctly!')
    } else {
      await global_store.show_error_snackbar('Something went wrong')
    }
  }

  async function add_privilege(stmt) {
    const _response = await request_crate(stmt)
    if (_response.ok) {
      state.response_from_add_permissions = {
        type: 'success',
        title: 'Added successfully'
      }
    } else {
      const data = await _response.json()
      state.response_from_add_permissions = {
        type: 'error',
        title: 'Error',
        subtitle: data.error.message
      }
    }
  }

  return {
    ...toRefs(state),
    add_privilege,
    create_user,
    alter_user,
    drop_user,
    revoke_permission
  }
})
