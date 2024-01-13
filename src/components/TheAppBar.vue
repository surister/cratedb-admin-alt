<script setup>
import VerticalDivider from "@/components/shared/VerticalDivider.vue";
import InfoGroup from "@/components/TheAppBarInfo.vue";
import SupportButton from "@/components/TheAppBarSupportButton.vue";

import {use_global_store} from "@/store/global_store";
import {use_users_store} from "@/store/users";

const global_store = use_global_store()
const user_store = use_users_store()
const admin_ui_version = import.meta.env.VITE_ADMIN_UI_VERSION
</script>

<template>
  <v-app-bar :elevation="0" density="compact" border="10" class="v-border-b">
    <template v-slot:prepend>
      <span class="ml-10 text-h5 font-weight-bold">CrateDB Admin</span>
      <v-chip color="orange" class="mb-4" variant="text">{{ admin_ui_version }}</v-chip>
    </template>

    <template v-slot:append>

      <vertical-divider/>

      <info-group/>

      <vertical-divider/>

      <v-btn variant="outlined" class="ml-5" color="primary" size="small" prepend-icon="mdi-account">{{ user_store.current_user_name }}</v-btn>

      <support-button/>

      <vertical-divider/>

      <v-btn icon="mdi-cog"
             size="small"
        @click="global_store.settings_drawer_toggle = !global_store.settings_drawer_toggle"/>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
