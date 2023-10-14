<script setup>
import VerticalDivider from "@/components/VerticalDivider.vue";
import { useGlobalStore } from "@/store/globalStore";

import InfoGroup from "@/components/bar/info/InfoGroup.vue";

const global_store = useGlobalStore()
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:title>
      <span class="ml-10">CrateDB Alternative panel</span>
    </template>
    <template v-slot:append>
      <vertical-divider></vertical-divider>
      <info-group></info-group>
      <vertical-divider></vertical-divider>
      <v-btn variant="flat" color="primary">Crate</v-btn>
      <vertical-divider></vertical-divider>
      <v-btn icon="mdi-cog"
             @click="global_store.settingsDrawerToggle = !global_store.settingsDrawerToggle"></v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
