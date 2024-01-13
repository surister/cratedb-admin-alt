<template>
  <v-app>
    <settings-drawer/>
    <the-app-bar/>
    <navigation-drawer/>
    <default-view />
    <the-bottom-app-bar/>
    <connection-alert/>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import SettingsDrawer from "@/components/TheSettingsDrawer.vue";
  import NavigationDrawer from "@/components/TheNavigationDrawer.vue";
  import ConnectionAlert from "@/components/shared/snackbars/NetworkErrorSnackbar.vue";
  import TheAppBar from "@/components/TheAppBar.vue";
  import TheBottomAppBar from "@/components/TheBottomAppBar.vue";
</script>
