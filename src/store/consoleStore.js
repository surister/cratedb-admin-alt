import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {requestCrate} from "@/store/http/requests";

const defaultConsoleResponseState = {
  type: '',
  title: '',
  subtitle: '',
  errorTrace: ''
}
export const useConsoleStore = defineStore('console', () => {
  const state = reactive({
    content: '', // The current content of the console
    response: defaultConsoleResponseState

  })

  async function queryFromConsole() {
      const _response = await requestCrate(state.content, 'error_trace=true')
      const consoleResponse = await _response.json()
      if (_response.ok){
        state.response.type = 'success'
        state.response.title = 'Ok'
        state.response.subtitle = `SELECT OK, ${consoleResponse.rowcount} record(s) returned`
      } else {
        state.response.type = 'error'
        state.response.title = 'Error'
        state.response.subtitle = consoleResponse.error.message
        state.response.errorTrace = consoleResponse.error_trace
      }

  }

  return {...toRefs(state), queryFromConsole}
})
