import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {requestCrate} from "@/store/http/requests";
import Queries from "@/store/http/queries";


const defaultConsoleResponseState = {
  type: '',
  title: '',
  subtitle: '',
  errorTrace: ''
}
export const useConsoleStore = defineStore('console', () => {
  const state = reactive({
    content: '', // The current content of the console.
    response: {...defaultConsoleResponseState},
    queryIsRunning: false,
    addQueryToHistory: true,
  })

  async function setConsoleResponseToError(jsonResponse) {
    state.response.type = 'error'
    state.response.title = 'Error'
    state.response.subtitle = jsonResponse.error.message
    state.response.errorTrace = jsonResponse.error_trace
  }

  async function setConsoleResponseToEmpty(){
    state.response = {...defaultConsoleResponseState}
  }

  async function cancelQuery() {
    const _jobsResponse = await requestCrate(Queries.GET_JOB_BY_STMT, null, {'%stmt': state.content})
    const jobs = await _jobsResponse.json()
    const targetJob = jobs.rows[0][0]

    const _killResponse = await requestCrate(Queries.KILL, null, {'%id': targetJob})
    const killJsonResponse = await _killResponse.json()

    if (_killResponse.ok) {
      state.queryIsRunning = false
    } else {
      await setConsoleResponseToError(killJsonResponse)
    }
  }

  async function queryFromConsole() {
    state.queryIsRunning = true

    const _response = await requestCrate(state.content, 'error_trace=true')
    const consoleResponse = await _response.json()
    if (_response.ok) {
      state.response.type = 'success'
      state.response.title = 'Ok'
      state.response.subtitle = `SELECT OK, ${consoleResponse.rowcount} record(s) returned`
    } else {
      await setConsoleResponseToError(consoleResponse)
    }
    state.queryIsRunning = false
  }

  return {...toRefs(state), queryFromConsole, cancelQuery, setConsoleResponseToEmpty}
})
