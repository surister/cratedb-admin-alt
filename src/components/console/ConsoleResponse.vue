<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import TracebackDialog from "@/components/console/TracebackDialog.vue";

const consoleStore = useConsoleStore()

</script>

<template>
  <v-card v-if="consoleStore.response">
    <template #title>
      <p
        :class="[ consoleStore.response.type === 'success' ? 'text-green-accent-3' : 'text-red-accent-4' ]">
        {{ consoleStore.response.title }}</p>
    </template>
    <template #text>
      <p class="" style="font-size: 20px">{{ consoleStore.response.subtitle }}</p>
    </template>
    <v-card-actions v-if="consoleStore.response.type === 'error'">
      <traceback-dialog v-if="consoleStore.response.errorTrace"></traceback-dialog>
    </v-card-actions>
  </v-card>


</template>

<style scoped>

</style>
