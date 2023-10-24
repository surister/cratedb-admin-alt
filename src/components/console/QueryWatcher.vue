<script setup>
import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()

</script>

<template>
  <v-btn class="ml-2" size="x-large" @click="consoleStore.live_update = !consoleStore.live_update">
    <template #default>
      <v-switch v-model="consoleStore.live_update" color="primary">
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
