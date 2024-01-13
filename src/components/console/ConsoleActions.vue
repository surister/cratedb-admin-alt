<script setup>
import QueryWatcher from "@/components/console/ConsoleActionsLiveUpdateBtn.vue";
import SubmitBtn from "@/components/console/ConsoleActionsSubmitBtn.vue";
import CancelQueryBtn from "@/components/console/ConsoleActionsCancelQueryBtn.vue";
import QueryHistorySwitch from "@/components/console/ConsoleActionsHistorySwitch.vue";
import FormatQueryBtn from "@/components/console/ConsoleActionsFormatQueryBtn.vue";
import ConsoleActionSaveQuery from "@/components/console/ConsoleActionSaveQuery.vue";
import ConsoleActionsHistoryBtn from "@/components/console/ConsoleActionsHistoryBtn.vue";

import {use_console_store} from "@/store/console_store";
import ConsoleActionsShareQueryBtn from "@/components/console/ConsoleActionsShareQueryBtn.vue";
const console_store = use_console_store()
</script>

<template>
  <v-sheet class="v-border-a" rounded>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="1">
          <v-text-field density="compact"
                        v-model="console_store.consoles[console_store.current_console_index].name"
                        variant="underlined"
                        label="query"
                        single-line
                        hide-details
                        clearable>
          </v-text-field>
        </v-col>
        <v-divider class="mx-1"
                   vertical/>
        <v-col class="d-flex justify-start">
          <submit-btn/>
          <cancel-query-btn/>
          <format-query-btn/>
          <query-watcher/>
          <query-history-switch/>
        </v-col>

        <v-col class="text-right d-block"
               cols="2">
          <console-action-save-query/>
          <console-actions-history-btn/>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>

</style>
