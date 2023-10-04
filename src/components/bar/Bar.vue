<script setup>
import VerticalDivider from "@/components/VerticalDivider.vue";
import {useSettingsStore} from "@/store/settingsStore";

import InfoGroup from "@/components/bar/info/InfoGroup.vue";

const settingsStore = useSettingsStore()
</script>

<template>
<v-app-bar :elevation="2">
  <template v-slot:append>
    <vertical-divider></vertical-divider>
    <info-group></info-group>
    <vertical-divider></vertical-divider>
    <v-btn variant="flat" color="primary">Crate</v-btn>
    <vertical-divider></vertical-divider>
    <v-btn icon="mdi-cog"
           @click="settingsStore.settingsDrawerToggle = !settingsStore.settingsDrawerToggle"></v-btn>
  </template>
</v-app-bar>
</template>

<style scoped>

</style>
