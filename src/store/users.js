import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {requestCrate} from "@/store/http/requests";

import queries from "@/store/http/queries";

import {use_global_store} from "@/store/globalStore";
import {use_log_store} from "@/store/log";

export const use_users_store = defineStore('users', () => {
  const state = reactive({
    current_open_user: null
  })
  const global_store = use_global_store()
  const log_store = use_log_store()

  async function revoke_permission(permission) {
    const {type, class_, ident, id} = permission
    const _response = await requestCrate(queries.REVOKE, null,
      {
        '%permission': type,
        '%type': class_,
        '%ident': ident,
        '%to': state.current_open_user.name
      })

    if (_response.ok) {
      const real_index = state.current_open_user.privileges.findIndex((el) => el.id === id)
      state.current_open_user.privileges.splice(real_index, 1)
      global_store.show_successful_snackbar('Permission revoked successfully')
      await log_store.log(log_store.ACTIONS.REVOKED_PERMISSION, JSON.stringify(permission))

    } else {
      global_store.show_error_snackbar('Something went wrong!')
    }
  }

  async function drop_user() {
    const _response = await requestCrate(
      queries.DROP_USER,
      null,
      {'%user_name': state.current_open_user.name}
    )

    if (_response.ok) {
      global_store.show_successful_snackbar('User deleted correctly')
      log_store.log(log_store.ACTIONS.USER_DELETED, state.current_open_user.name)
      state.current_open_user = null
    } else {
      global_store.show_error_snackbar("Something went wrong, could not delete user!")
    }
  }

  return {
    ...toRefs(state),
    drop_user,
    revoke_permission
  }
})
