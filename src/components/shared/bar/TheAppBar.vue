<script setup>
import VerticalDivider from "@/components/shared/VerticalDivider.vue";
import { use_global_store } from "@/store/globalStore";

import InfoGroup from "@/components/shared/bar/info/InfoGroup.vue";
import SupportButton from "@/components/shared/bar/SupportButton.vue";
import {useNodeInfoStore} from "@/store/nodeInfo";

const global_store = use_global_store()
const info_store = useNodeInfoStore()
const admin_ui_version = import.meta.env.VITE_ADMIN_UI_VERSION
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <span class="ml-10 text-h4 font-weight-bold">CrateDB Alternative panel</span>
      <v-chip color="orange" class="mb-4" variant="text">{{ admin_ui_version }}</v-chip>
    </template>

    <template v-slot:append>
      <vertical-divider></vertical-divider>
      <info-group></info-group>
      <vertical-divider></vertical-divider>
      <v-btn variant="flat">{{ info_store.current_user }}</v-btn>
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
