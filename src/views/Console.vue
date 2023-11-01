<script setup>
import AceConsole from "@/components/console/ConsoleEditor.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import History from "@/components/console/ConsoleHistory.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/ConsoleActions.vue";

import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()

</script>

<template>
  <v-row>
    <v-col>
      <h1>Console
        <v-chip v-if="console_store.live_update">
          <v-progress-circular indeterminate size="15" color="red"></v-progress-circular>
          <span class="ml-2">Live update</span>
        </v-chip>
      </h1>

    </v-col>
  </v-row>
  <v-row>
    <v-col cols="9">
      <ace-console></ace-console>
      <v-row>
        <v-col class="mt-6">
          <console-actions></console-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <console-response v-if="console_store.response.type !== ''"/>
          <console-table-results class="mt-6"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
      <history/>
    </v-col>
  </v-row>

  <!--  Dialogs -->
  <v-dialog v-model="console_store.show_full_screen_response">
    <console-table-results v-if="console_store.show_full_screen_response"/>
  </v-dialog>

</template>

<style scoped>

</style>
