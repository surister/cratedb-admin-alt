<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const storedPreferences = use_stored_preferences_store()
</script>

<template>
  <v-btn size="x-large" @click="storedPreferences.console.add_query_to_history = !storedPreferences.console.add_query_to_history ">
    <template #default>
      <v-switch v-model="storedPreferences.console.add_query_to_history" color="primary">
        <template v-slot:label>
          <h4>Add query to history</h4>
        </template>
      </v-switch>
    </template>
  </v-btn>
</template>

<style scoped>

</style>
