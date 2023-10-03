<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const preferences = useStoredPreferencesStore()

</script>

<template>
  <v-label class="mb-2 font-weight-medium">Theme</v-label>
  <v-radio-group
    v-model="preferences.theme"
    class="mb-2"
    color="primary"
    hide-details
    true-icon="mdi-check-circle-outline">
    <v-radio value="dark">
      <template #label>
        <v-icon icon="mdi-weather-night" start></v-icon>
        <p :class="[ preferences.theme === 'dark' ? 'font-weight-bold': '' ]">Dark</p>
      </template>
    </v-radio>
    <v-radio value="light">
      <template #label>
        <v-icon icon="mdi-weather-sunny" start></v-icon>
        <p :class="[ preferences.theme === 'light' ? 'font-weight-bold': '' ]">Light</p>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<style scoped>

</style>
