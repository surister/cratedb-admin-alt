<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const storedPreferences = useStoredPreferencesStore()
</script>

<template>
  <v-snackbar
    :timeout="2000"
    color="deep-purple-accent-4"
    elevation="24"
    location="bottom end"
    vertical
  >
    <template #actions>
      <v-btn>Try again in ()</v-btn>
      <v-btn>Close</v-btn>
    </template>
    <template v-slot:activator="{ props }">
      <v-btn color="deep-purple-accent-4" class="ma-2" v-bind="props">open</v-btn>
    </template>
    Could not connect to <strong>{{ storedPreferences.general.masterNodeUrl }}</strong>
  </v-snackbar>
</template>

<style scoped>

</style>
