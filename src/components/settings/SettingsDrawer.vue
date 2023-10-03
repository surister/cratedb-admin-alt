<script setup>
import {useSettingsStore} from "@/store/settingsStore";
import ThemeToggle from "@/components/settings/ThemeToggle.vue";
import ListItemLink from "@/components/settings/ListItemLink.vue";

const settingsStore = useSettingsStore()

const drawerLinks = [
  {
    title: 'Latest release',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-link-variant',
    linkTitle: 'v1.2.4',
    linkTo: ''
  },
  {
    title: 'Documentation',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-text-box-multiple-outline',
    linkTitle: 'v5.4',
    linkTo: ''
  },
  {
    title: 'Edit this in Github',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-github',
    linkTitle: 'Repo',
    linkTo: ''
  },
  {
    title: 'Check our blog!',
    appendIcon: 'mdi-open-in-new',
    preprendIcon: 'mdi-post-outline',
    linkTitle: 'Blog',
    linkTo: ''
  },

]

</script>

<template>
  <v-navigation-drawer
    width="350"
    v-model="settingsStore.settingsDrawerToggle"
    temporary
    location="right">

    <v-toolbar title="Settings" flat>
      <template #append>
        <v-btn
          icon="mdi-close"
          variant="flat"
          @click="settingsStore.settingsDrawerToggle = false"
        />
      </template>
    </v-toolbar>

    <v-container>
      <theme-toggle/>
      <v-label class="mb-2 mt-3 font-weight-medium">Language</v-label>
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
                        :link-to="link.linkTo"></list-item-link>
      </v-list>
    </template>
  </v-navigation-drawer>

</template>

<style scoped>

</style>
