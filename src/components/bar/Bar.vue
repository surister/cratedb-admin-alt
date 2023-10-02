<script setup>

import ThemeToggle from "@/components/bar/ThemeToggle.vue";
</script>

<template>
<v-app-bar :elevation="2">
  <template v-slot:append>
    <v-btn icon="mdi-heart"></v-btn>
    <v-btn icon="mdi-magnify"></v-btn>
    <v-btn icon="mdi-dots-vertical"></v-btn>
    <theme-toggle></theme-toggle>
  </template>
</v-app-bar>
</template>

<style scoped>

</style>
