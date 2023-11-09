<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-tooltip text="Queries" location="top">
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal"
             class="ml-2"
             icon="mdi-history"
             v-bind="props"
             @click="console_store.history_drawer = !console_store.history_drawer"/>
    </template>
  </v-tooltip>


</template>

<style scoped>

</style>
