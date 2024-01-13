// Use this store to control state of any variable that you want to be persisted across sessions.
// it will be automatically stored/loaded in localStorage

import {defineStore} from 'pinia'
import {reactive, toRefs, watch} from 'vue';
import {useTheme} from "vuetify";
import {useRoute} from "vue-router";

const defaultState = {
    theme: 'light',
    console: {
        font_size: 25,
        min_lines: 10,
        max_lines: 20,
        query_limit: 100,
        add_query_to_history: true,
        query_history: [],
        saved_queries: [] // { name: '', query: ''}
    },
    general: {
        master_node_url: 'http://localhost:4201'
    },
    experimental_query_limit: false,
    tables_drawer_opened: [],
}
export const use_stored_preferences_store = defineStore('stored_preferences', () => {
        const state = reactive(defaultState)
        const theme = useTheme()
        const router = useRoute()
        if (router.query.node_uri){
          state.general.master_node_url = router.query.node_uri
        }

        function delete_from_history(query_id) {
            state.console.query_history.splice(state.console.query_history.findIndex(function (i) {
                return i.id === query_id;
            }), 1);
        }

        function reset_query_history() {
            state.console.query_history = []
        }

        async function save_query(name, stmt) {
            let lastIndex = 0

            if (state.console.saved_queries.length !== 0) {
                lastIndex = state.console.saved_queries.at(0).id
            }

            state.console.saved_queries.unshift(
                {
                    id: lastIndex + 1,
                    name: name,
                    stmt: stmt
                }
            )
          return {ok: true}
        }

        function remove_saved_query(query_id) {
            state.console.saved_queries.splice(state.console.saved_queries.findIndex(function (i) {
                return i.id === query_id;
            }), 1);
        }

        function add_to_history(stmt) {
            if (state.console.add_query_to_history) {
                let lastIndex = 0
                if (state.console.query_history.length !== 0) {
                    lastIndex = state.console.query_history.at(0).id
                }
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
            save_query,
            remove_saved_query
        }
    },
    {
        persist: true
    }
)
