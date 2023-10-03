<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

const nodeInfoStore = useNodeInfoStore()
</script>

<template>
    <v-label>System Load</v-label>
    <v-chip class="ma-2" label>
      <p class="font-weight-bold" style="font-size: 17px">
        {{ nodeInfoStore.load1 }} / {{ nodeInfoStore.load5 }} / {{ nodeInfoStore.load15 }}
      </p>
    </v-chip>

</template>

<style scoped>

</style>
