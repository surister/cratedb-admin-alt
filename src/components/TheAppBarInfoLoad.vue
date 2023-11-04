<script setup>
import {use_node_info_store} from "@/store/node_info";

const node_info_store = use_node_info_store()
</script>

<template>
<span>
  <v-label class="pr-2">System Load</v-label>
    <v-chip label>
      <p class="font-weight-bold" style="font-size: 17px">
        <template v-if="node_info_store.nodes.has_nodes()">
          {{ node_info_store.nodes.get_master_node().load.load1 }} /
          {{ node_info_store.nodes.get_master_node().load.load5 }} /
          {{ node_info_store.nodes.get_master_node().load.load15 }}
        </template>
        <template v-else>
          load/load/load
        </template>
      </p>
    </v-chip>
</span>

</template>

<style scoped>

</style>
