<script setup>
import AceConsole from "@/components/console/AceConsole.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import {useConsoleStore} from "@/store/consoleStore";
import History from "@/components/console/History.vue";
import {useStoredPreferencesStore} from "@/store/storedPreferences";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()

function query() {
  consoleStore.queryFromConsole()
  storedPreferences.addToQueryHistory(consoleStore.content)
}
</script>

<template>
  <v-row align="center" class="mt-2">
    <v-col><h1>Console</h1></v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-chip class="m-5">mode: read/write</v-chip>
      <v-checkbox label="Add query to history"
                  v-model="storedPreferences.console.addQueryToHistory">
      </v-checkbox>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <ace-console></ace-console>
    </v-col>
    <v-col cols="3">
      <history/>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn :loading="consoleStore.queryIsRunning" size="x-large" @click="query"
             class="mx-2" :disabled="consoleStore.content.length === 0">Submit
      </v-btn>
      <v-tooltip location="bottom" text="Stop running query">
        <template v-slot:activator="{ props }">
          <v-btn size="x-large" prepend-icon="mdi-cancel" v-bind="props" class="mx-2"
                 :disabled="!consoleStore.queryIsRunning" @click="consoleStore.cancelQuery()">Cancel
            query
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Copy query link to clipboard">
        <template v-slot:activator="{ props }">
        </template>
      </v-tooltip>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <console-response v-if="consoleStore.response.type !== ''"></console-response>
      <console-table-results></console-table-results>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
