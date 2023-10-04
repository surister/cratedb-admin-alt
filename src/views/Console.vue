<script setup>

import AceConsole from "@/components/console/AceConsole.vue";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()
</script>

<template>
  <h1>Console</h1>
  <v-row>
    <v-col>
      <ace-console></ace-console>
    </v-col>
    <v-col cols="3">
      <v-card>History</v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div>
        <v-btn size="x-large" @click="consoleStore.queryFromConsole()">Submit</v-btn>
        <v-btn size="x-large" class="ml-4">Copy</v-btn>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <console-response v-if="consoleStore.response.type !== ''"></console-response>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</template>

<style scoped>

</style>
