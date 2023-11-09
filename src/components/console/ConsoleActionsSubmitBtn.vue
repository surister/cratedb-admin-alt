<script setup>

import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()

function do_query() {
  console_store.query_from_console()
  stored_preferences.add_to_history(console_store.content)
}
</script>

<template>
  <v-btn :loading="console_store.current_console.is_query_running"
         @click="do_query"
         :disabled="console_store.current_console.content.length === 0"
         variant="outlined"
         color="success"
         prepend-icon="mdi-play"
         text="run"/>
</template>

<style scoped>

</style>
