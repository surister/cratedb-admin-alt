<script setup>
import HealthInfoPopOver from "@/components/bar/info/HealthInfoPopOver.vue";

import {ref} from "vue";

let menu = ref(false)
</script>

<template>
  <v-row class="mr-1">
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom">
        <template v-slot:activator="{ props }">
          <v-label class="mr-2" :clickable="true" v-bind="props">Health:</v-label>
        </template>
        <health-info-pop-over></health-info-pop-over>
      </v-menu>
      <v-progress-circular model-value="100" size="20" width="5"></v-progress-circular>
      <v-label class="mx-2">Data:</v-label>
      <v-progress-circular color="green" model-value="100" size="20" width="5"></v-progress-circular>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>
