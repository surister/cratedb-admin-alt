<script setup>

import Nodes from "@/components/shared/bar/info/Nodes.vue";
import Health from "@/components/shared/bar/info/health/Health.vue";
import SystemLoad from "@/components/shared/bar/info/SystemLoad.vue";
import NodeChecks from "@/components/shared/bar/info/nodechecks/NodeChecks.vue";
</script>

<template>
  <nodes class="mx-2"></nodes>
  <health class="mx-2"></health>
  <node-checks class="mx-2"></node-checks>
  <system-load class="mx-2"></system-load>

</template>

<style scoped>

</style>
