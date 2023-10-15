<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

import {computed, ref} from "vue";
import NodeChecksPopOver from "@/components/bar/info/nodechecks/NodeChecksPopOver.vue";

const nodeInfoStore = useNodeInfoStore()

let menu = ref(false)

const status = computed(()=>{
  const checksSucceed = nodeInfoStore.node_checks.isEmpty()
  return checksSucceed ? {
    color: 'success',
    icon: 'mdi-check',
    message: 'All checks passed successfully' }
    : {
      color: 'red',
      icon: 'mdi-alert-box',
      message: 'Some checks failed'
    }
})
</script>



<template>

  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="bottom left">
    <template v-slot:activator="{ props }">
      <v-chip
        label
        v-bind="props"
      >
        <v-icon start :icon="status.icon" :color="status.color"></v-icon>
        <v-label :color="status.color">Node Checks</v-label>
      </v-chip>
    </template>
    <node-checks-pop-over
      :icon="status.icon"
      :color="status.color"
      :message="status.message"
      :node_checks="nodeInfoStore.node_checks"
    ></node-checks-pop-over>
  </v-menu>


</template>

<style scoped>

</style>
