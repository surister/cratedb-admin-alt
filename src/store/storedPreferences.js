// Utilities
import {defineStore} from 'pinia'
import {reactive, toRefs, watch} from 'vue';
import {useTheme} from "vuetify";

const localStorageKey = 'crateDB@storedPreferences'
export const useStoredPreferencesStore = defineStore('storedPreferences', () => {
  const state = reactive({
    theme: 'light'
  })
  const theme = useTheme()

  function load() {
    const stored = localStorage.getItem(localStorageKey)
    const data = stored ? JSON.parse(stored) : {}


    Object.assign(state, data)

    // State initialized from stored Preferences at this point, do stuff below.
    theme.global.name.value = state.theme
  }

  function save() {
    if (state.theme != theme.global.name.value){
      theme.global.name.value = state.theme
    }

    localStorage.setItem(localStorageKey, JSON.stringify(state, null, 2))
  }

  load()

  // Whenever the state of any stored preferences changes, we store it.
  watch(
    state, () => save()
  )

  return {
    ...toRefs(state),
    load,
    save
  }
  }
)
