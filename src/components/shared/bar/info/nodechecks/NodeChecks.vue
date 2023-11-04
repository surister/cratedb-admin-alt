<script setup>
import {use_node_info_store} from "@/store/node_info";

import {computed, ref} from "vue";
import NodeChecksPopOver from "@/components/shared/bar/info/nodechecks/NodeChecksPopOver.vue";

const node_info_store = use_node_info_store()

let menu = ref(false)

const status = computed(() => {
  const checksSucceed = node_info_store.node_checks.is_empty()
  return checksSucceed ? {
        color: 'success',
        icon: 'mdi-check',
        message: 'All checks passed successfully'
      }
      : {
        color: 'red',
        icon: 'mdi-alert-box',
        message: 'Some checks failed'
      }
})
</script>

<template>
  <span>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom left">
    <template v-slot:activator="{ props }">
      <v-chip
          label
          v-bind="props">
        <v-icon start
                :icon="status.icon"
                :color="status.color"/>
        <v-label :color="status.color"
                 :clickable="true"
                 text="Node Checks"/>
      </v-chip>
    </template>
    <node-checks-pop-over
        :icon="status.icon"
        :color="status.color"
        :message="status.message"
        :node_checks="node_info_store.node_checks"/>
  </v-menu>
  </span>
</template>

<style scoped>

</style>
