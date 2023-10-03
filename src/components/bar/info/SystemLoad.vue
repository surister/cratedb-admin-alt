<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

const nodeInfoStore = useNodeInfoStore()
</script>

<template>
  System Load
  <v-chip class="ma-2" label>
    <p class="font-weight-bold">
      {{ nodeInfoStore.load1 }} / {{ nodeInfoStore.load5 }}  / {{ nodeInfoStore.load15 }}
    </p>
  </v-chip>
</template>

<style scoped>

</style>
