<script setup>
import AceConsole from "@/components/console/ConsoleEditor.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/ConsoleActions.vue";
import ConsoleTabs from "@/components/console/ConsoleTabs.vue";

import {use_stored_preferences_store} from "@/store/storedPreferences";
import {use_console_store} from "@/store/console_store";

import {computed, ref} from "vue";
import ConsoleHistoryDrawer from "@/components/console/ConsoleHistoryDrawer.vue";
import ConsoleEditor from "@/components/console/ConsoleEditor.vue";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()
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
      <console-editor></console-editor>
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
