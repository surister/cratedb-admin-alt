<template>
  <v-app>
    <settings-drawer></settings-drawer>
    <bar></bar>
    <navigation-drawer></navigation-drawer>
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'

  import Bar from "@/components/bar/Bar.vue";
  import SettingsDrawer from "@/components/settings/SettingsDrawer.vue";
  import NavigationDrawer from "@/components/leftdrawer/NavigationDrawer.vue";
</script>
