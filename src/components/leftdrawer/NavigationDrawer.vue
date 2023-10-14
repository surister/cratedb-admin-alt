<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

let drawer = ref(true)
let rail = ref(true)

const router = useRoute()

let chevron_button = computed(()=> rail.value ? 'mdi-chevron-right': 'mdi-chevron-left')
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
  >
    <v-btn variant="text" class="ma-1" :icon="chevron_button" @click.stop="rail = !rail"></v-btn>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Overview" value="home" :to="{ name: 'home' }"
                   :active="router.path == '/'" link></v-list-item>
      <v-list-item prepend-icon="mdi-console" title="Console" value="console"
                   :to="{ name: 'console'}" link></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Tables" :to="{ name : 'tables' }"
                   value="tables"></v-list-item>
      <v-list-item prepend-icon="mdi-checkerboard" title="Cluster" :to="{ name : 'cluster' }"
                   value="cluster"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
