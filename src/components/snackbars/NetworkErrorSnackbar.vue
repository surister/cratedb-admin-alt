<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";
import {useGlobalStore} from "@/store/globalStore";

const storedPreferences = useStoredPreferencesStore()
const globalStore = useGlobalStore()
</script>

<template>
  <v-snackbar
    timeout="99999999"
    v-model="globalStore.show_network_connection_snackbar"
    color="warning"
    elevation="24"
    location="bottom end"
    vertical
  >
    <template #actions>
      <v-btn @click="globalStore.show_network_connection_snackbar = false">Close</v-btn>
    </template>

    <v-label class="font-weight-bold ml-1 pt-1">
      <v-icon icon="mdi-wifi-strength-alert-outline"/>
      <span class="pl-2">Possible network issue</span>
    </v-label>
    <p class="pt-2">Could not connect to <strong>'{{ storedPreferences.general.masterNodeUrl }}'</strong>
      will try again in 5s.</p>
    <p> Tried {{ globalStore.network_connection_attemps || 1 }} time(s)</p>
  </v-snackbar>
</template>

<style scoped>

</style>
