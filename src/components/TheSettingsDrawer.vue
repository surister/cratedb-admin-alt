<script setup>
import ThemeToggle from "@/components/TheSettingsDrawerThemeToggle.vue";
import ListItemLink from "@/components/shared/ListItemLink.vue";
import ConsoleSettings from "@/components/TheSettingsDrawerConsoleSettings.vue";
import GeneralSettings from "@/components/TheSettingsDrawerGeneralSettings.vue";

import {use_global_store} from "@/store/global_store";
import {use_log_store} from "@/store/log";
import Debug from "@/components/debug.vue";

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

const dev_mode = import.meta.env.DEV
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
          @click="global_store.settings_drawer_toggle = false"/>
      </template>
    </v-toolbar>

    <v-container>
      <theme-toggle/>
      <console-settings/>
      <general-settings/>
    </v-container>

    <debug v-if="dev_mode"></debug>

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
  </v-navigation-drawer>

</template>

<style scoped>

</style>
