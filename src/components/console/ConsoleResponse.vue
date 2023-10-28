<script setup>
import {use_console_store} from "@/store/console_store";
import TracebackDialog from "@/components/console/TracebackDialog.vue";

const console_store = use_console_store()

</script>

<template>
  <v-card v-if="console_store.response">
    <template #title>
      <p
        :class="[ console_store.response.type === 'success' ? 'text-green-accent-3' : 'text-red-accent-4' ]">
        {{ console_store.response.title }}</p>
    </template>
    <template #text>
      <p style="font-size: 20px">{{ console_store.response.subtitle }}</p>
    </template>
    <v-card-actions>
      <traceback-dialog v-if="console_store.response.errorTrace"></traceback-dialog>
      <v-btn @click="console_store.setConsoleResponseToEmpty()">Clear</v-btn>
    </v-card-actions>
  </v-card>


</template>

<style scoped>

</style>
