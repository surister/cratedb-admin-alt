<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()

</script>

<template>
  <v-tooltip text="If active, will re-submit the query automatically every 5s" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"
             class="ml-2"
             :prepend-icon="console_store.live_update ? 'mdi-check-circle-outline' : 'mdi-circle-outline'"
             variant="tonal"
             size="small"
             text="Live update"
             :disabled="console_store.current_console.content.length === 0"
             @click="console_store.live_update = !console_store.live_update">
        <template #prepend>
          <template v-if="console_store.live_update">
            <v-progress-circular model-value="100"
                                 :indeterminate="true"
                                 size="10"
                                 width="2"
                                 color="green"/>
          </template>
          <template v-else>
            <v-icon>mdi-circle-outline</v-icon>
          </template>
        </template>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
