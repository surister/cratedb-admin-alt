<script setup>
import HealthInfoPopOver from "@/components/TheAppBarHealthPopOver.vue";

import {computed, ref} from "vue";
import {use_node_info_store} from "@/store/node_info";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";

let menu = ref(false)

const node_info_store = use_node_info_store()
const health_status = computed(() => CRATE_HEALTH_LEGEND[node_info_store.health.get_current_health_level()])
</script>

<template>
  <span>
      <v-menu v-model="menu"
              :close-on-content-click="false"
              location="bottom">
        <template v-slot:activator="{ props }">
          <v-label class="ml-2 mr-2"
                   :clickable="true"
                   text="Health:"
                   v-bind="props"/>
        </template>
        <health-info-pop-over :icon="health_status.icon"
                              :color="health_status.color"
                              :message="health_status.message"
                              :healths="node_info_store.health.get_bad_healths()"
        />
      </v-menu>
      <v-progress-circular model-value="100"
                           size="20"
                           width="5"
                           :color="health_status.color"
                           class="mr-1"/>
  </span>
</template>

<style scoped>
</style>
