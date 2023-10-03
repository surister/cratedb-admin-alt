<template>
  <v-app>
    <settings-drawer></settings-drawer>
    <bar></bar>
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'

  import Bar from "@/components/bar/Bar.vue";
  import SettingsDrawer from "@/components/settings/SettingsDrawer.vue";
</script>
