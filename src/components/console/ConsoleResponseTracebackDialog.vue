<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-dialog width="70vw">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="View traceback" v-if="console_store.response.type === 'error'"/>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Crate DB server traceback">
        <v-card-text>
          <v-code>
            {{ console_store.response.error_trace }}
          </v-code>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            block
            text="Close"
            @click="isActive.value = false"/>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
