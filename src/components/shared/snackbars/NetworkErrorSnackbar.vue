<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {use_global_store} from "@/store/global_store";

const storedPreferences = use_stored_preferences_store()
const globalStore = use_global_store()
</script>

<template>
  <v-snackbar timeout="99999999"
              v-model="globalStore.show_network_connection_snackbar"
              color="warning"
              elevation="24"
              location="bottom end"
              vertical>
    <template #actions>
      <v-btn @click="globalStore.show_network_connection_snackbar = false" text="Close"/>
    </template>

    <v-label class="font-weight-bold ml-1 pt-1">
      <v-icon icon="mdi-wifi-strength-alert-outline"/>
      <span class="pl-2">Possible network issue</span>
    </v-label>
    <p class="pt-2">Could not connect to <strong>'{{
        storedPreferences.general.master_node_url
      }}'</strong>
      will try again in 5s.</p>
    <p> Tried {{ globalStore.network_connection_attempts || 1 }} time(s)</p>
  </v-snackbar>
</template>

<style scoped>

</style>
