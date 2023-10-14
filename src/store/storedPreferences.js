// Use this store to control state of any variable that you want to be persisted across sessions.
// it will be automatically stored/loaded in localStorage

import {defineStore} from 'pinia'
import {reactive, toRefs, watch} from 'vue';
import {useTheme} from "vuetify";

const localStorageKey = 'crateDB@storedPreferences'
const defaultState = {
    theme: 'light',
    console: {
        fontSize: 25,
        minLines: 10,
        maxLines: 20,
        queryLimit: 100,
        addQueryToHistory: true,
        queryHistory: []
    },
    general: {
        masterNodeUrl: 'http://localhost:4201'
    }
}
export const useStoredPreferencesStore = defineStore('storedPreferences', () => {
    const state = reactive(defaultState)
    const theme = useTheme()

    function load() {
      const stored = localStorage.getItem(localStorageKey)
      const data = stored ? JSON.parse(stored) : {}

      Object.assign(state, data)

      // State initialized from stored Preferences at this point, do stuff below.
      theme.global.name.value = state.theme
    }

    function deleteHistory(item) {
      state.console.queryHistory.splice(state.console.queryHistory.findIndex(function (i) {
        return i.id === item.id;
      }), 1);
    }

    function resetQueryHistoryState() {
      state.console.queryHistory = []
    }

    function addToQueryHistory(stmt) {
      let lastIndex = 0
      if (state.console.queryHistory.length !== 0) {
        lastIndex = state.console.queryHistory.slice(-1)[0].id
      }

      if (state.console.addQueryToHistory) {
        state.console.queryHistory.unshift(
          {id: lastIndex + 1, query: stmt}
        )
      }
    }

    function save() {
      if (state.theme !== theme.global.name.value) {
        theme.global.name.value = state.theme
      }
      localStorage.setItem(localStorageKey, JSON.stringify(state, null, 2))
    }

    load()

    // Whenever the state of any stored preferences changes, we store it.
    watch(
      state, () => {
        console.log('Stored State changed')
        console.log(state)
        save()
      }
    )

    return {
      ...toRefs(state),
      load,
      save,
      resetHistoryState: resetQueryHistoryState,
      addToQueryHistory,
      deleteHistory
    }
  }
)
