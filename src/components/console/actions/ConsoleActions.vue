<script setup>
import QueryWatcher from "@/components/console/QueryWatcher.vue";
import SubmitBtn from "@/components/console/actions/SubmitBtn.vue";

import CancelQueryBtn from "@/components/console/actions/CancelQueryBtn.vue";
import QueryHistorySwitch from "@/components/console/actions/QueryHistorySwitch.vue";
import FormatQueryBtn from "@/components/console/actions/FormatQueryBtn.vue";
</script>

<template>
  <submit-btn></submit-btn>
  <cancel-query-btn></cancel-query-btn>
  <v-col v-if="false">
    <v-tooltip text="Copy query link to clipboard">
      <template v-slot:activator="{ props }">
      </template>
    </v-tooltip>
  </v-col>
  <query-history-switch></query-history-switch>
  <query-watcher></query-watcher>
  <format-query-btn></format-query-btn>
</template>

<style scoped>
.v-btn__prepend.no-inline-margin-left {
  margin-inline-end: 0 !important;
}
</style>
