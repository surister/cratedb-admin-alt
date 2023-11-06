<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-tooltip location="bottom"
             text="Stop running query">
    <template v-slot:activator="{ props }">
      <v-btn prepend-icon="mdi-cancel"
             v-bind="props"
             variant="tonal"
             class="mx-2"
             :disabled="!console_store.current_console.is_query_running"
             @click="console_store.cancel_current_running_query()"
             text="Cancel query"/>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
