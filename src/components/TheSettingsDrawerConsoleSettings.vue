<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const storedPreferences = use_stored_preferences_store()
</script>

<template>
      <v-label class="mb-2 mt-3 font-weight-medium">Console settings</v-label>
      <v-row>
        <v-col>
          <v-text-field label="Font size"
                        v-model:model-value="storedPreferences.console.font_size"
                        suffix="px"/>
          <v-text-field label="Min lines"
                        v-model:model-value="storedPreferences.console.min_lines"
                        suffix="lines"/>
        </v-col>
        <v-col>
          <v-text-field label="Query limit"
                        v-model:model-value="storedPreferences.console.query_limit"
                        model-value="100"
                        suffix="rows"/>
          <v-text-field label="Max lines"
                        v-model:model-value="storedPreferences.console.max_lines"
                        suffix="lines"/>
        </v-col>
      </v-row>
</template>

<style scoped>

</style>
