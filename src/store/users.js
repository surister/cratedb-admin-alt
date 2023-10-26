import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";

export const use_users_store = defineStore('users', () => {
  const state = reactive({
    current_open_user: null
  })
  return toRefs(state)
})
