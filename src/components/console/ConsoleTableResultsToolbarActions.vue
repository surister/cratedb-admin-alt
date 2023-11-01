<script setup>

import DownloadBtn from "@/components/console/ConsoleResponseDownloadBtn.vue";
import ConsoleTableResultsToolbarActionsViewRaw
  from "@/components/console/ConsoleTableResultsToolbarActionsViewRawBtn.vue";
import {use_console_store} from "@/store/console_store";

const consoleStore = use_console_store()
</script>

<template>
  <console-table-results-toolbar-actions-view-raw :object="consoleStore.response.data.rows"/>
  <download-btn/>

  <v-btn v-if="!consoleStore.show_full_screen_response"
         icon="mdi-fullscreen"
         @click="consoleStore.show_full_screen_response = !consoleStore.show_full_screen_response"/>
</template>

<style scoped>

</style>
