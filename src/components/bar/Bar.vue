<script setup>
import VerticalDivider from "@/components/VerticalDivider.vue";
import { useGlobalStore } from "@/store/globalStore";

import InfoGroup from "@/components/bar/info/InfoGroup.vue";
import SupportButton from "@/components/bar/SupportButton.vue";

const global_store = useGlobalStore()
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:title>
      <h2 class="ml-10"> CrateDB Alternative panel</h2>
    </template>
    <template v-slot:append>
      <vertical-divider></vertical-divider>
      <info-group></info-group>
      <vertical-divider></vertical-divider>
      <v-btn variant="flat">Crate</v-btn>
      <support-button></support-button>
      <vertical-divider></vertical-divider>
      <v-btn icon="mdi-cog"
             @click="global_store.settingsDrawerToggle = !global_store.settingsDrawerToggle"></v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
