<script setup>

import Nodes from "@/components/TheAppBarInfoNodes.vue";
import Health from "@/components/TheAppBarHealth.vue";
import SystemLoad from "@/components/TheAppBarInfoLoad.vue";
import NodeChecks from "@/components/TheAppBarNodeChecks.vue";
</script>

<template>
  <nodes class="mx-2"/>
  <health class="mx-2"/>
  <node-checks class="mx-2"/>
  <system-load class="mx-2"/>
</template>

<style scoped>

</style>
