<script setup>
import {use_node_info_store} from "@/store/node_info";

const nodeStore = use_node_info_store()
</script>

<template>
  <v-chip prepend-icon="mdi-resistor-nodes">
    <span class="font-weight-bold">
          Nodes: {{ nodeStore.nodes.node_count }}
    </span>
  </v-chip>
</template>

<style scoped>

</style>
