<script setup>
import HealthInfoPopOver from "@/components/bar/info/health/HealthInfoPopOver.vue";

import {computed, ref} from "vue";
import {useNodeInfoStore} from "@/store/nodeInfo";

let menu = ref(false)

const messages = {
  GREEN: {
    icon: 'mdi-check',
    color: 'green',
    message: 'All shards (primary and replicated) are started.'
  },
  YELLOW: {
    icon: 'mdi-alert',
    color: 'warning',
    message: 'At least one shard is under-replicated (replica shard not started or unassigned).'
  },
  RED: {
    icon: 'mdi-close-octagon',
    color: 'red',
    message: 'At least one primary shard is missing (primary shard not started or unassigned).'
  },
  UNKNOWN: {
    icon: 'mdi-wifi-strength-alert-outline',
    color: '',
    message: 'Cannot get health info, check that you have connection, that the cluster is up or that there are tables in the cluster.'
  }
}
const nodeInfoStore = useNodeInfoStore()
const health_status = computed(() => {return messages[nodeInfoStore.health.getHealthLevel().health]})
</script>

<template>
  <span>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom">
        <template v-slot:activator="{ props }">
          <v-label class="ml-2 mr-2" :clickable="true" v-bind="props">Health:</v-label>
        </template>
        <health-info-pop-over
          :icon="health_status.icon"
          :color="health_status.color"
          :message="health_status.message"
          :healths="nodeInfoStore.health.getBadHealths()"
        ></health-info-pop-over>
      </v-menu>
      <v-progress-circular
        model-value="100"
        size="20"
        width="5"
        :color="health_status.color"
        class="mr-1">
      </v-progress-circular>
  </span>
</template>

<style scoped>
</style>
