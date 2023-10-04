<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

const nodeStore = useNodeInfoStore()

</script>

<template>
  <v-chip class="mr-4" size="large" prepend-icon="mdi-resistor-nodes">
    <p class="font-weight-bold">
          Nodes: {{ nodeStore.nodes.nodeCount }}
    </p>

  </v-chip>
</template>

<style scoped>

</style>
