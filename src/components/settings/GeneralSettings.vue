<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const storedPreferences = useStoredPreferencesStore()
</script>

<template>
<v-label class="mb-2 mt-3 font-weight-medium">General settings</v-label>
  <v-row>
    <v-col><v-text-field label="Master node url" v-model:model-value="storedPreferences.general.masterNodeUrl"></v-text-field></v-col>
  </v-row>
</template>

<style scoped>

</style>
