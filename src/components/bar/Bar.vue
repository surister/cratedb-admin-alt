<script setup>
import VerticalDivider from "@/components/VerticalDivider.vue";
import {useSettingsStore} from "@/store/settingsStore";
import SystemLoad from "@/components/bar/info/SystemLoad.vue";

const settingsStore = useSettingsStore()
</script>

<template>
<v-app-bar :elevation="2">
  <template v-slot:append>
    <system-load></system-load>
    <vertical-divider></vertical-divider>
    <v-btn variant="flat" color="primary">Crate</v-btn>
    <vertical-divider></vertical-divider>
    <v-btn icon="mdi-cog"
           @click="settingsStore.settingsDrawerToggle = !settingsStore.settingsDrawerToggle"></v-btn>
    <!--    <theme-toggle></theme-toggle>-->
  </template>
</v-app-bar>
</template>

<style scoped>

</style>
