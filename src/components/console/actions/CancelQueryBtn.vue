<script setup>
import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()
</script>

<template>
  <v-tooltip location="bottom" text="Stop running query">
    <template v-slot:activator="{ props }">
      <v-btn size="x-large" prepend-icon="mdi-cancel" v-bind="props" class="mx-2"
             :disabled="!consoleStore.queryIsRunning" @click="consoleStore.cancelQuery()">Cancel
        query
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
