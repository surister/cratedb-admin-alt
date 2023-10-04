<script setup>
import HealthInfoPopOver from "@/components/bar/info/HealthInfoPopOver.vue";

import {ref} from "vue";

let menu = ref(false)
</script>

<template>
  <v-row>
      <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="bottom">
        <template v-slot:activator="{ props }">
          <v-label :clickable="true" v-bind="props">Health</v-label>
        </template>
        <health-info-pop-over></health-info-pop-over>
      </v-menu>

    <v-radio value="1" :readonly="false" class="mr-1"></v-radio>
    <v-label>Data</v-label>
    <v-radio value="1" :readonly="false" class="mr-4"></v-radio>
  </v-row>
</template>

<style scoped>

</style>
