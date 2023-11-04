<script setup>
import QueryWatcher from "@/components/console/ConsoleActionsLiveUpdateBtn.vue";
import SubmitBtn from "@/components/console/ConsoleActionsSubmitBtn.vue";

import CancelQueryBtn from "@/components/console/ConsoleActionsCancelQueryBtn.vue";
import QueryHistorySwitch from "@/components/console/ConsoleActionsHistorySwitch.vue";
import FormatQueryBtn from "@/components/console/ConsoleActionsFormatQueryBtn.vue";
</script>

<template>
  <submit-btn/>
  <cancel-query-btn/>
  <v-col v-if="false">
    <v-tooltip text="Copy query link to clipboard">
      <template v-slot:activator="{ props }">
      </template>
    </v-tooltip>
  </v-col>
  <query-history-switch/>
  <query-watcher/>
  <format-query-btn/>
</template>

<style scoped>
.v-btn__prepend.no-inline-margin-left {
  margin-inline-end: 0 !important;
}
</style>
