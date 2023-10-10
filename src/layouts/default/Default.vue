<template>
  <v-app>
    <settings-drawer></settings-drawer>
    <bar></bar>
    <navigation-drawer></navigation-drawer>
    <default-view />
    <connection-alert></connection-alert>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'

  import Bar from "@/components/bar/Bar.vue";
  import SettingsDrawer from "@/components/settings/SettingsDrawer.vue";
  import NavigationDrawer from "@/components/leftdrawer/NavigationDrawer.vue";
  import ConnectionAlert from "@/components/ConnectionAlert.vue";
</script>
