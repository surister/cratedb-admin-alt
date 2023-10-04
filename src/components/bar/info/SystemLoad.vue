<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

const nodeInfoStore = useNodeInfoStore()
</script>

<template>
    <v-label>System Load</v-label>
    <v-chip class="ma-2" label>
      <p class="font-weight-bold" style="font-size: 17px">
        <template v-if="nodeInfoStore.nodes.hasNodes()">
          {{ nodeInfoStore.nodes.getMasterNode().load.load1 }} /
          {{ nodeInfoStore.nodes.getMasterNode().load.load5 }} /
          {{ nodeInfoStore.nodes.getMasterNode().load.load15 }}
        </template>
        <template v-else>
          load/load/load
        </template>
      </p>
    </v-chip>

</template>

<style scoped>

</style>
