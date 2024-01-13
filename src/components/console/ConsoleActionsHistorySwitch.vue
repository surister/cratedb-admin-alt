<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const stored_preferences = use_stored_preferences_store()
</script>

<template>
  <v-btn size="small"
         class="ml-2"
         text="Add to history"
         variant="tonal"
         :prepend-icon="stored_preferences.console.add_query_to_history ? 'mdi-check-circle-outline': 'mdi-circle-outline'"
         @click="stored_preferences.console.add_query_to_history = !stored_preferences.console.add_query_to_history"/>
</template>

<style scoped>

</style>
