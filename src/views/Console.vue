<script setup>
import AceConsole from "@/components/console/AceConsole.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import History from "@/components/console/History.vue";
import ConsoleTableResults from "@/components/console/table_response/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/actions/ConsoleActions.vue";

import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()

</script>

<template>
  <v-row>
    <v-col>
      <h1>Console</h1>
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
          <console-response v-if="consoleStore.response.type !== ''"/>
          <console-table-results class="mt-6"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
      <history/>
    </v-col>
  </v-row>

  <!--  Dialogs -->
  <v-dialog v-model="consoleStore.show_raw_response" max-width="800px">
    <v-code class="overflow-y-auto" tag="pre">
      {{ consoleStore.response.data.rows }}
    </v-code>
  </v-dialog>

  <v-dialog v-model="consoleStore.show_full_screen_response">
    <console-table-results v-if="consoleStore.show_full_screen_response"/>
  </v-dialog>

</template>

<style scoped>

</style>
