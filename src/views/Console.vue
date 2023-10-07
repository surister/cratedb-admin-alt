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
      <v-btn :loading="consoleStore.queryIsRunning" size="x-large" @click="consoleStore.queryFromConsole();push()"
             class="mx-2" :disabled="consoleStore.content.length === 0">Submit
      </v-btn>
      <v-tooltip location="bottom" text="Stop running query">
        <template v-slot:activator="{ props }">
          <v-btn size="x-large" prepend-icon="mdi-cancel" v-bind="props" class="mx-2"
                 :disabled="!consoleStore.queryIsRunning" @click="consoleStore.cancelQuery()">Cancel query
          </v-btn>
        </template>
      </v-tooltip>
      <v-btn size="x-large" class="mx-2">Copy</v-btn>
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
