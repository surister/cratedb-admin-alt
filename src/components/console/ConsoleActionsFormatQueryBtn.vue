<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
<v-btn size="x-large" class="ml-2" @click="console_store.format_query_content()">Format</v-btn>
</template>

<style scoped>

</style>
