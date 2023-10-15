<script setup>

import Nodes from "@/components/bar/info/Nodes.vue";
import Health from "@/components/bar/info/health/Health.vue";
import SystemLoad from "@/components/bar/info/SystemLoad.vue";
import NodeChecks from "@/components/bar/info/nodechecks/NodeChecks.vue";
</script>

<template>
  <nodes class="mx-2"></nodes>
  <health class="mx-2"></health>
  <node-checks class="mx-2"></node-checks>
  <system-load class="mx-2"></system-load>

</template>

<style scoped>

</style>
