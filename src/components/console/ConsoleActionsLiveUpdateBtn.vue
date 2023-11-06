<script setup>
import {use_console_store} from "@/store/console_store";

const consoleStore = use_console_store()

</script>

<template>
  <v-tooltip text="If active, will re-submit the query automatically every 5s" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"
             class="ml-2"
             variant="tonal"
             @click="consoleStore.live_update = !consoleStore.live_update">
        <template #default>
          <v-switch v-model="consoleStore.live_update"
                    flat
                    hide-details
                    density="compact"
                    color="primary">
          </v-switch>
        </template>
        <template #append><span class="ml-1">Live update</span></template>
      </v-btn>
    </template>
  </v-tooltip>




</template>

<style scoped>

</style>
