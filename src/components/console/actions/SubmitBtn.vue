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
  <v-btn :loading="consoleStore.is_query_running" size="x-large" @click="do_query"
         :disabled="consoleStore.content.length === 0">Submit
  </v-btn>
</template>

<style scoped>

</style>
