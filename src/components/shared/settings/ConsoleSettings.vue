<script setup>
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const storedPreferences = useStoredPreferencesStore()
</script>

<template>
      <v-label class="mb-2 mt-3 font-weight-medium">Console settings</v-label>
      <v-row>
        <v-col>
          <v-text-field
            label="Font size"
            v-model:model-value="storedPreferences.console.fontSize"
            suffix="px">
          </v-text-field>
          <v-text-field
            label="Min lines"
            v-model:model-value="storedPreferences.console.minLines"
            suffix="lines">
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Query limit"
            v-model:model-value="storedPreferences.console.queryLimit"
            model-value="100"
            suffix="rows"
          ></v-text-field>
          <v-text-field
            label="Max lines"
            v-model:model-value="storedPreferences.console.maxLines"
            suffix="lines">
          </v-text-field>
        </v-col>
      </v-row>
</template>

<style scoped>

</style>
