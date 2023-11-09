<script setup>

import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const console_store = use_console_store()
</script>

<template>
  <v-btn :loading="console_store.current_console.is_query_running"
         @click="console_store.query_from_console()"
         :disabled="console_store.current_console.content.length === 0"
         variant="outlined"
         color="success"
         prepend-icon="mdi-play"
         text="run"/>
</template>

<style scoped>

</style>
