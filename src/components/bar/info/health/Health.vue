<script setup>
import HealthInfoPopOver from "@/components/bar/info/health/HealthInfoPopOver.vue";

import {computed, ref} from "vue";
import {useNodeInfoStore} from "@/store/nodeInfo";

let menu = ref(false)


const nodeInfoStore = useNodeInfoStore()
const healthColor = computed(() => {
  switch (nodeInfoStore.health.getHealthLevel().health) {
    case 'GREEN':
      return 'green'
    case 'YELLOW':
      return 'yellow'
    case 'RED':
      return 'red'
    default:
      return 'warning'
  }
})
</script>

<template>
  <span class="">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom">
        <template v-slot:activator="{ props }">
          <v-label class="ml-2 mr-2" :clickable="true" v-bind="props">Health:</v-label>
        </template>
        <health-info-pop-over></health-info-pop-over>
      </v-menu>
      <v-progress-circular model-value="100" size="20" width="5" :color="healthColor"
                           class="mr-1"></v-progress-circular>

  </span>
</template>

<style scoped>
</style>
