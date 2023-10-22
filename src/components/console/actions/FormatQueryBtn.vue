<script setup>
import {useConsoleStore} from "@/store/consoleStore";

const console_store = useConsoleStore()
</script>

<template>
<v-btn size="x-large" class="ml-1" @click="console_store.format_query_content()">Format</v-btn>
</template>

<style scoped>

</style>
