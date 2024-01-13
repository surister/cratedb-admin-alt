<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-btn prepend-icon="mdi-format-text-rotation-down-vertical"
         @click="console_store.format_query_content()"
         variant="tonal"
         size="small"
         text="format"
        :disabled="console_store.current_console.content.length === 0"
  />
</template>

<style scoped>

</style>
