<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-tooltip location="bottom" text="Stop running query">
    <template v-slot:activator="{ props }">
      <v-btn size="x-large" prepend-icon="mdi-cancel" v-bind="props" class="mx-2"
             :disabled="!console_store.is_query_running" @click="console_store.cancelQuery()">Cancel
        query
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
