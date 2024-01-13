<script setup>
import {use_node_info_store} from "@/store/node_info";
import {computed} from "vue";

const node_info_store = use_node_info_store()

const to_fixed = (load) => {
  console.log(load)
  if (load instanceof String) {
    return load.toFixed(2)
  }
  return load
}
</script>

<template>
<span>
  <v-label class="pr-2 text-subtitle-2">System Load</v-label>
    <v-chip label size="small">
      <p class="font-weight-bold" style="font-size: 17px">
        <template
          v-if="node_info_store.nodes.has_nodes() && node_info_store.nodes.nodes[0].load.load1 != null">

          {{ to_fixed(node_info_store.nodes.get_master_node().load.load1) }} /
          {{ to_fixed(node_info_store.nodes.get_master_node().load.load5) }} /
          {{ to_fixed(node_info_store.nodes.get_master_node().load.load15) }}
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
