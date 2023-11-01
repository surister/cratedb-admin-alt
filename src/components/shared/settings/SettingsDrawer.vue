<script setup>
import ThemeToggle from "@/components/shared/settings/ThemeToggle.vue";
import ListItemLink from "@/components/shared/settings/ListItemLink.vue";
import ConsoleSettings from "@/components/shared/settings/ConsoleSettings.vue";
import GeneralSettings from "@/components/shared/settings/GeneralSettings.vue";

import {use_global_store} from "@/store/globalStore";
import {use_log_store} from "@/store/log";

const global_store = use_global_store()
const log_store = use_log_store()

const drawerLinks = [
  {
    title: 'Current release',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-link-variant',
    linkTitle: import.meta.env.VITE_ADMIN_UI_VERSION,
    linkTo: ''
  },
  {
    title: 'CrateDB Docs',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-text-box-multiple-outline',
    linkTitle: 'v5.4',
    linkTo: 'https://cratedb.com/docs/crate/reference/en/latest/'
  },
  {
    title: 'Edit this in Github',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-github',
    linkTitle: 'Repo',
    linkTo: 'https://github.com/surister/crate-admin-alt'
  },
  {
    title: 'Check CrateDB blog!',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-post-outline',
    linkTitle: 'Blog',
    linkTo: 'https://cratedb.com/blog'
  },
]
</script>

<template>
  <v-navigation-drawer
    width="350"
    v-model="global_store.settings_drawer_toggle"
    temporary
    location="right">

    <v-toolbar title="Settings" flat>
      <template #append>
        <v-btn
          icon="mdi-close"
          variant="flat"
          @click="global_store.settings_drawer_toggle = false"
        />
      </template>
    </v-toolbar>

    <v-container>
      <theme-toggle/>
      <console-settings/>
      <general-settings/>
    </v-container>

    <template #append>
      <v-divider/>
      <v-list>
        <list-item-link v-for="link in drawerLinks"
                        :key="link.title"
                        :title="link.title"
                        :append-icon="link.appendIcon"
                        :preprend-icon="link.preprendIcon"
                        :link-title="link.linkTitle"
                        :link-to="link.linkTo"
        ></list-item-link>
      </v-list>
    </template>

    <v-btn @click="log_store.log(log_store.ACTIONS.CREATE_TABLE, 'doc.asdfoap1')">Debug</v-btn>
  </v-navigation-drawer>

</template>

<style scoped>

</style>
