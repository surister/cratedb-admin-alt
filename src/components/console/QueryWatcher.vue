<script setup>
import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()

</script>

<template>
  <v-btn class="ml-2" size="x-large" @click="consoleStore.watch_query = !consoleStore.watch_query">
    <template #default>
      <v-switch v-model="consoleStore.watch_query" color="primary">
        <template v-slot:label>
          <h4>Watch query</h4>
        </template>
      </v-switch>
    </template>
  </v-btn>
  <v-btn class="ml-1" icon="mdi-information" variant="text"/>
</template>

<style scoped>

</style>
