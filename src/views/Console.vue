<script setup>
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/ConsoleActions.vue";
import ConsoleTabs from "@/components/console/ConsoleTabs.vue";

import {use_console_store} from "@/store/console_store";

import ConsoleHistoryDrawer from "@/components/console/ConsoleHistoryDrawer.vue";
import ConsoleEditor from "@/components/console/ConsoleEditor.vue";

const console_store = use_console_store()
</script>

<template>
  <console-history-drawer/>
  <v-row no-gutters>
    <v-col>
      <console-tabs></console-tabs>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <console-actions></console-actions>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col>
      <console-editor @keydown.shift.enter.prevent="console_store.query_from_console()"
                      v-model:content="console_store.consoles[console_store.current_console_index].content"/>
      <console-response v-if="console_store.response.type !== ''"/>
      <console-table-results class="mt-4"/>
    </v-col>
  </v-row>

  <!-- Dialogs -->
  <v-dialog v-model="console_store.show_full_screen_response">
    <console-table-results v-if="console_store.show_full_screen_response"/>
  </v-dialog>

</template>

<style scoped>

</style>
