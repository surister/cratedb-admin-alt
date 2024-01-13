<script setup>
import DownloadBtn from "@/components/console/ConsoleTableResultsToolbarActionsDownlaodBtn.vue";
import ConsoleTableResultsToolbarActionsViewRaw
  from "@/components/console/ConsoleTableResultsToolbarActionsViewRawBtn.vue";
import {use_console_store} from "@/store/console_store";
import VerticalDivider from "@/components/shared/VerticalDivider.vue";

const consoleStore = use_console_store()

</script>

<template>
  <v-switch hide-details
            class="switch-right"
            v-model="consoleStore.object_representation_mode"
            :label="consoleStore.object_representation_mode ? 'Object mode' : 'Dialog mode'"
            color="primary"/>
  <vertical-divider/>

  <console-table-results-toolbar-actions-view-raw :object="consoleStore.current_console.response.data.rows"/>

  <download-btn/>

  <v-btn v-if="!consoleStore.show_full_screen_response"
         icon="mdi-fullscreen"
         size="small"
         @click="consoleStore.show_full_screen_response = !consoleStore.show_full_screen_response"/>

</template>

<style scoped>
.switch-right {
  display: flex;
  justify-content: right;
}
</style>
