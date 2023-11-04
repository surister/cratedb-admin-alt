import {defineStore} from "pinia";
import {reactive, toRefs, watch} from "vue";
import {request_crate} from "@/store/http/requests";

import Queries from "@/store/http/queries";

import {format_sql} from "@/store/utils";
import {useRoute, useRouter} from "vue-router";


const default_console_response = {
    type: '',
    title: '',
    subtitle: '',
    error_trace: '',
    data: {
        headers: [],
        rows: [],
    }
}

export const use_console_store = defineStore('console', () => {
    const state = reactive({
        content: '', // The current content of the console.
        response: {...default_console_response}, // The response from querying to CrateDB
        is_query_running: false,
        add_query_to_history: true,
        live_update: false,
        _live_update_interval: null,
        show_full_screen_response: false,
    })
    const router = useRouter()
    const route = useRoute()

    async function format_query_content() {
        state.content = format_sql(state.content)
    }

    async function set_console_response_to_error(type, title, subtitle, error_trace) {
        state.response.type = type
        state.response.title = title
        state.response.subtitle = subtitle
        state.response.error_trace = error_trace
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
        const _jobs_response = await request_crate(
            Queries.GET_JOB_BY_STMT,
            null,
            {'%stmt': state.content})
        const jobs = await _jobs_response.json()
        const target_job = jobs.rows[0][0]

        const _kill_response = await request_crate(
            Queries.KILL,
            null,
            {'%id': target_job})
        const kill_json_response = await _kill_response.json()

        if (_kill_response.ok) {
            state.is_query_running = false
        } else {
            await set_console_response_to_error(kill_json_response)
        }
    }

    async function query_from_console() {
        state.is_query_running = true

        const _response = await request_crate(
            state.content,
            'error_trace=true',
            {},
            true)
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


    if (route.query.query != null) {
        state.content = route.query.query
    }

    // Syncs the content of the console with the url query, it could have also been done
    // via subscribing the @update event in the console component, but I think
    // it's easier to maintain if every event is on the same place.
    watch(
        () => state.content, async () => {
            await router.replace({path: route.path, query: {query: state.content}})
        }
    )

    // Whenever live_update is true, every 5000ms, we re-submit the query this enables
    // our 'live' update feature.
    const LIVE_UPDATE_EVERY_MS = 5000

    watch(
        () => state.live_update, () => {
            if (state.live_update) {
                state._live_update_interval = setInterval(
                    async () => {
                        await query_from_console()
                    }, LIVE_UPDATE_EVERY_MS
                )
            } else {
                clearInterval(state._live_update_interval)
            }
        }
    )

    return {
        ...toRefs(state),
        query_from_console,
        cancel_current_running_query,
        set_console_response_to_empty,
        format_query_content
    }
})
