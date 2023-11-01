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

  import Bar from "@/components/shared/bar/TheAppBar.vue";
  import SettingsDrawer from "@/components/shared/settings/SettingsDrawer.vue";
  import NavigationDrawer from "@/components/shared/TheNavigationDrawer.vue";
  import ConnectionAlert from "@/components/shared/snackbars/NetworkErrorSnackbar.vue";
</script>
