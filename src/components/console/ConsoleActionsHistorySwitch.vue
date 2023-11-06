<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const storedPreferences = use_stored_preferences_store()
</script>

<template>
  <v-btn @click="storedPreferences.console.add_query_to_history = !storedPreferences.console.add_query_to_history"
        variant="tonal">
    <template #default>
      <v-switch density="compact"
                hide-details
                flat
                v-model="storedPreferences.console.add_query_to_history"
                color="primary">
      </v-switch>
    </template>
    <template #append><span class="ml-1">Add query to history</span></template>
  </v-btn>
</template>

<style scoped>

</style>
