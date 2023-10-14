<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()
function do_query() {
  consoleStore.queryFromConsole()
  storedPreferences.addToQueryHistory(consoleStore.content)
}
</script>

<template>
  <v-btn :loading="consoleStore.queryIsRunning" size="x-large" @click="do_query"
         :disabled="consoleStore.content.length === 0">Submit
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
</template>

<style scoped>

</style>
