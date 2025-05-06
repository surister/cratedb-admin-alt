<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

let drawer = ref(true)
let rail = ref(true)

const router = useRoute()

let chevron_button = computed(() => rail.value ? 'mdi-chevron-right' : 'mdi-chevron-left')

const routes = [
  {
    to: 'home',
    icon: 'mdi-home-city',
    value: 'home',
    title: 'Home',
    active_if_matches: '/'
  },
  {
    to: 'console',
    icon: 'mdi-console',
    value: 'console',
    title: 'Console',
    active_if_matches: '/console'
  },
  {
    to: 'tables',
    icon: 'mdi-table',
    value: 'tables',
    title: 'Tables',
    active_if_matches: '/tables'
  },
  {
    to: 'users',
    icon: 'mdi-account-group',
    value: 'users',
    title: 'Users',
    active_if_matches: '/users'
  },
  {
    to: 'logs',
    icon: 'mdi-note-search',
    value: 'logs',
    title: 'Logs',
    active_if_matches: '/logs'
  },
  {
    to: 'repositories',
    icon: 'mdi-book',
    value: 'repositories',
    title: 'Repositories',
    active_if_matches: '/repositories'
  },
  {
    to: 'ai',
    icon: 'mdi-vector-combine',
    value: 'ai',
    title: 'Vector Workbench',
    active_if_matches: '/ai'
  }
]
</script>

<template>
  <v-navigation-drawer v-model="drawer"
                       :rail="rail"
                       permanent>
    <v-btn variant="text"
           class="ma-1"
           :icon="chevron_button"
           @click.stop="rail = !rail"/>
    <v-divider/>
    <v-list density="compact" nav>
      <v-list-item v-for="route in routes"
                   :key="route.value"
                   :prepend-icon="route.icon"
                   :title="route.title"
                   :value="route.value"
                   :to="{ name: route.to }"
                   :active="router.path === route.active_if_matches" link/>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
