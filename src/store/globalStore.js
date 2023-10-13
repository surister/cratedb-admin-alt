// Store for Global state.

import {defineStore} from 'pinia'
import {reactive, toRefs} from 'vue';

export const useGlobalStore = defineStore('settings', () => {
    const state = reactive({
      settingsDrawerToggle: false,
      show_network_connection_snackbar: false,
      network_connection_attemps: 1,
    })

    return {
      ...toRefs(state),
    }
  }
)
