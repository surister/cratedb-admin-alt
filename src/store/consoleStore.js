import {defineStore} from "pinia";
import {reactive, toRefs, watch} from "vue";
import {requestCrate} from "@/store/http/requests";

import Queries from "@/store/http/queries";

import {format_sql} from "@/store/utils";


const default_console_response = {
    type: '',
    title: '',
    subtitle: '',
    errorTrace: '',
    data: {
        headers: [],
        rows: [],
    }
}

export const useConsoleStore = defineStore('console', () => {
    const state = reactive({
        content: '', // The current content of the console.
        response: {...default_console_response}, // The response from querying to CrateDB
        is_query_running: false,
        addQueryToHistory: true,
        live_update: false,
        _watch_query_interval: null,
        show_raw_response: false,
        show_full_screen_response: false,
    })

    async function format_query_content() {
        state.content = format_sql(state.content)
    }

    async function set_console_response_to_error(type, title, subtitle, error_trace) {
        state.response.type = type
        state.response.title = title
        state.response.subtitle = subtitle
        state.response.errorTrace = error_trace
    }

    async function set_console_response_to_success(type, title, subtitle, rows, headers, row_count) {
        state.response.type = 'success'
        state.response.title = 'Success'
        state.response.subtitle = subtitle
        state.response.data.rows = rows
        state.response.data.headers = headers
        state.response.data.row_count = row_count
    }

    async function set_console_response_to_empty() {
        state.response = {...default_console_response}
    }

    async function cancel_current_running_query() {
        const _jobs_response = await requestCrate(Queries.GET_JOB_BY_STMT, null, {'%stmt': state.content})
        const jobs = await _jobs_response.json()
        const target_job = jobs.rows[0][0]

        const _kill_response = await requestCrate(Queries.KILL, null, {'%id': target_job})
        const kill_json_response = await _kill_response.json()

        if (_kill_response.ok) {
            state.is_query_running = false
        } else {
            await set_console_response_to_error(kill_json_response)
        }
    }

    async function query_from_console() {
        state.is_query_running = true

        const _response = await requestCrate(state.content, 'error_trace=true')
        const json_response = await _response.json()
        if (_response.ok) {
            await set_console_response_to_success(
                'success',
                'Success!',
                `QUERY OK, ${json_response.rowcount} record(s) returned in ${(json_response.duration / 1000).toFixed(4)}s`,
                json_response.rows,
                json_response.cols,
                json_response.rowcount
            )
        } else {
            await set_console_response_to_error(
                'error',
                'Error',
                json_response.error.message,
                json_response.error_trace
            )
            state.live_update = false
        }
        state.is_query_running = false

    }

    watch(
        () => state.live_update, () => {
            if (state.live_update) {
                state._watch_query_interval = setInterval(
                    async () => {
                        await query_from_console()
                    }, 5000
                )
            } else {
                clearInterval(state._watch_query_interval)
            }
        }
    )

    return {
        ...toRefs(state),
        queryFromConsole: query_from_console,
        cancelQuery: cancel_current_running_query,
        setConsoleResponseToEmpty: set_console_response_to_empty,
        format_query_content
    }
})
