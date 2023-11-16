<script setup>
import VerticalDivider from "@/components/shared/VerticalDivider.vue";
import InfoGroup from "@/components/TheAppBarInfo.vue";
import SupportButton from "@/components/TheAppBarSupportButton.vue";

import {use_node_info_store} from "@/store/node_info";
import {use_global_store} from "@/store/global_store";
import {use_users_store} from "@/store/users";

const global_store = use_global_store()
const user_store = use_users_store()
const admin_ui_version = import.meta.env.VITE_ADMIN_UI_VERSION
</script>

<template>
  <v-app-bar :elevation="1" density="comfortable">
    <template v-slot:prepend>
      <span class="ml-10 text-h4 font-weight-bold">CrateDB Alternative panel</span>
      <v-chip color="orange" class="mb-4" variant="text">{{ admin_ui_version }}</v-chip>
    </template>

    <template v-slot:append>
      <vertical-divider></vertical-divider>
      <info-group></info-group>
      <vertical-divider></vertical-divider>
      <v-btn variant="flat" class="ml-5" color="primary">{{ user_store.current_user_name }}</v-btn>
      <support-button></support-button>
      <vertical-divider></vertical-divider>
      <v-btn
        icon="mdi-cog"
        @click="global_store.settings_drawer_toggle = !global_store.settings_drawer_toggle"/>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
