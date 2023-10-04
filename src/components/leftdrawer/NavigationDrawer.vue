<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

let drawer = ref(true)
let rail = ref(true)

const router = useRoute()

</script>

<template>
  <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
  >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="CrateDB"
        nav
    >
      <template v-slot:append>
        <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Overview" value="home" :to="{ name: 'home' }" :active="router.path == '/'" link></v-list-item>
      <v-list-item prepend-icon="mdi-console" title="Console" value="console" :to="{ name: 'console'}" link></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Tables" :to="{ name : 'tables' }" value="tables"></v-list-item>
      <v-list-item prepend-icon="mdi-checkerboard" title="Cluster" :to="{ name : 'cluster' }" value="cluster"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
