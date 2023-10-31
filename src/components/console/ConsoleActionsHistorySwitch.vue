<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const storedPreferences = useStoredPreferencesStore()
</script>

<template>
  <v-btn size="x-large" @click="storedPreferences.console.addQueryToHistory = !storedPreferences.console.addQueryToHistory ">
    <template #default>
      <v-switch v-model="storedPreferences.console.addQueryToHistory" color="primary">
        <template v-slot:label>
          <h4>Add query to history</h4>
        </template>
      </v-switch>
    </template>
  </v-btn>
</template>

<style scoped>

</style>
