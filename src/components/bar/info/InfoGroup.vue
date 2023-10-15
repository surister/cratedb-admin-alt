<script setup>

import Nodes from "@/components/bar/info/Nodes.vue";
import Health from "@/components/bar/info/health/Health.vue";
import SystemLoad from "@/components/bar/info/SystemLoad.vue";
import NodeChecks from "@/components/bar/info/nodechecks/NodeChecks.vue";
</script>

<template>
  <nodes></nodes>
  <health></health>
  <node-checks></node-checks>
  <system-load></system-load>
</template>

<style scoped>

</style>
