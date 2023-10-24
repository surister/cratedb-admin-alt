<script setup>
import VerticalDivider from "@/components/VerticalDivider.vue";
import { use_global_store } from "@/store/globalStore";

import InfoGroup from "@/components/bar/info/InfoGroup.vue";
import SupportButton from "@/components/bar/SupportButton.vue";

const global_store = use_global_store()
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
             @click="global_store.settings_drawer_toggle = !global_store.settings_drawer_toggle"></v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
