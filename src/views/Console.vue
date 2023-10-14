<script setup>
import AceConsole from "@/components/console/AceConsole.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import {useConsoleStore} from "@/store/consoleStore";
import History from "@/components/console/History.vue";
import {useStoredPreferencesStore} from "@/store/storedPreferences";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/ConsoleActions.vue";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()

</script>

<template>
  <v-row class="mt-2">
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
          <console-response v-if="consoleStore.response.type !== ''"></console-response>
          <console-table-results class="mt-6"></console-table-results>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
      <history/>
    </v-col>
  </v-row>


</template>

<style scoped>

</style>
