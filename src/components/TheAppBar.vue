<script setup>
import VerticalDivider from "@/components/shared/VerticalDivider.vue";
import InfoGroup from "@/components/TheAppBarInfo.vue";
import SupportButton from "@/components/TheAppBarSupportButton.vue";

import {use_node_info_store} from "@/store/node_info";
import {use_global_store} from "@/store/global_store";
import {use_users_store} from "@/store/users";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const global_store = use_global_store()
const user_store = use_users_store()
const stored_preferences_store = use_stored_preferences_store()
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

      <v-btn
        icon="mdi-cog"
        @click="global_store.settings_drawer_toggle = !global_store.settings_drawer_toggle"/>
    </template>
  </v-app-bar>

  <v-app-bar location="bottom" class="v-border-t" density="compact" height="60">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-label>
            If you like it give us a <v-icon size="x-small" color="yellow" class="ml-1">mdi-star</v-icon>
          </v-label>
        </v-col>
        <v-spacer/>
        <v-col>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="text-right">
              <v-chip label>
                <v-progress-circular model-value="100"
                                     size="10"
                                     width="5"
                                     color="green"/>
                <span class="mx-2">Connected:</span>
                {{ stored_preferences_store.general.master_node_url }}
              </v-chip>
            </v-col>
            <v-col class="text-center" cols="1">
              <v-icon class="ml-2">mdi-github</v-icon>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
