// Store for Settings drawer component.

import {defineStore} from 'pinia'
import {reactive, toRefs} from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const state = reactive({
      settingsDrawerToggle: false
    })

    return {
      ...toRefs(state),
    }
  }
)
