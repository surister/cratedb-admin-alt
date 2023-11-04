// Use this store to control state of any variable that you want to be persisted across sessions.
// it will be automatically stored/loaded in localStorage

import {defineStore} from 'pinia'
import {reactive, toRefs, watch} from 'vue';
import {useTheme} from "vuetify";

const defaultState = {
    theme: 'light',
    console: {
        font_size: 25,
        min_lines: 10,
        max_lines: 20,
        query_limit: 100,
        add_query_to_history: true,
        query_history: []
    },
    general: {
        master_node_url: 'http://localhost:4201'
    }
}
export const use_stored_preferences_store = defineStore('stored_preferences', () => {
        const state = reactive(defaultState)
        const theme = useTheme()

        function delete_from_history(item) {
            state.console.query_history.splice(state.console.query_history.findIndex(function (i) {
                return i.id === item.id;
            }), 1);
        }

        function reset_query_history() {
            state.console.query_history = []
        }

        function add_to_history(stmt) {
            let lastIndex = 0
            if (state.console.query_history.length !== 0) {
                lastIndex = state.console.query_history.slice(-1)[0].id
            }

            if (state.console.add_query_to_history) {
                state.console.query_history.unshift(
                    {id: lastIndex + 1, query: stmt}
                )
            }
        }

        watch(
            () => state.theme, async (value) => {
                theme.global.name.value = value
            }
        )

        return {
            ...toRefs(state),
            reset_query_history,
            add_to_history,
            delete_from_history,
        }
    },
    {
        persist: true
    }
)
