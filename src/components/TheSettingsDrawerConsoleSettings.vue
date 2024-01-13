<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const stored_preferences_store = use_stored_preferences_store()
</script>

<template>
  <v-label class="mb-2 mt-3 font-weight-medium">Console settings</v-label>
  <v-row>
    <v-col>
      <v-text-field label="Font size"
                    v-model:model-value="stored_preferences_store.console.font_size"
                    suffix="px"/>
      <v-text-field label="Min lines"
                    v-model:model-value="stored_preferences_store.console.min_lines"
                    suffix="lines"/>
    </v-col>
    <v-col>
      <v-text-field label="Query limit"
                    v-model:model-value="stored_preferences_store.console.query_limit"
                    model-value="10000"
                    suffix="rows"/>

      <v-text-field label="Max lines"
                    v-model:model-value="stored_preferences_store.console.max_lines"
                    suffix="lines"/>

    </v-col>

  </v-row>

  <v-row no-gutters="">
    <v-col>
      <v-switch color="red-darken-3"
                class="ml-1"
                v-model="stored_preferences_store.experimental_query_limit"
                hide-details
                density="compact"
                label="Query limit"/>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>
