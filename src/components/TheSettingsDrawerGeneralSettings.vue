<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const storedPreferences = use_stored_preferences_store()
</script>

<template>
<v-label class="mb-2 mt-3 font-weight-medium">General settings</v-label>
  <v-row>
    <v-col><v-text-field label="Master node url" v-model:model-value="storedPreferences.general.master_node_url"></v-text-field></v-col>
  </v-row>
</template>

<style scoped>

</style>
