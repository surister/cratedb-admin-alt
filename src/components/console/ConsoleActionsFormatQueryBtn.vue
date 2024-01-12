<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-btn class="ml-2"
         prepend-icon="mdi-format-text-rotation-down-vertical"
         @click="console_store.format_query_content()"
         variant="tonal"
         size="small"
         text="format"/>
</template>

<style scoped>

</style>
