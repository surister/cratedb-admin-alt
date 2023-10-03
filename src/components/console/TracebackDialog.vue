<script setup>
import {useConsoleStore} from "@/store/consoleStore";

const consoleStore = useConsoleStore()
</script>

<template>
  <v-dialog width="70vw">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="View traceback"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Crate DB server traceback">
        <v-card-text>
          <v-code>
            {{ consoleStore.response.errorTrace }}
          </v-code>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            block
            text="Close"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
