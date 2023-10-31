import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {requestCrate} from "@/store/http/requests";
import queries from "@/store/http/queries";
import {use_global_store} from "@/store/globalStore";

export const use_users_store = defineStore('users', () => {
  const state = reactive({
    current_open_user: null
  })
  const global_store = use_global_store()
  async function revoke_permission(type, class_, ident, grantee, id) {
    const _response = await requestCrate(queries.REVOKE, null,
        {
          '%permission': type,
          '%type': class_,
          '%ident': ident,
          '%to': grantee
        })
    const data = await _response.json()

    if(_response.ok){
      const real_index = state.current_open_user.privileges.findIndex((el) => el.id === id)
      state.current_open_user.privileges.splice(real_index, 1)
      global_store.show_successful_snackbar('Permission revoked successfully')
    } else {
        global_store.show_error_snackbar('Something went wrong!')
    }

    console.log(data)
  }

  return {
    ...toRefs(state),
    revoke_permission
  }
})
