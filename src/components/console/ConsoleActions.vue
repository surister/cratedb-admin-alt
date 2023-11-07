<script setup>
import QueryWatcher from "@/components/console/ConsoleActionsLiveUpdateBtn.vue";
import SubmitBtn from "@/components/console/ConsoleActionsSubmitBtn.vue";

import CancelQueryBtn from "@/components/console/ConsoleActionsCancelQueryBtn.vue";
import QueryHistorySwitch from "@/components/console/ConsoleActionsHistorySwitch.vue";
import FormatQueryBtn from "@/components/console/ConsoleActionsFormatQueryBtn.vue";
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-sheet border>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="2">
            <v-text-field
                    density="compact"
                    v-model="console_store.consoles[console_store.current_console_index].name"
                    variant="underlined"
                    label="query"
                    single-line
                    hide-details
                    clearable>
          </v-text-field>
        </v-col>
        <v-divider class="mx-1" vertical/>
        <v-col>
            <submit-btn/>
            <cancel-query-btn/>
            <query-history-switch/>
            <query-watcher/>
            <format-query-btn/>
        </v-col>

        <v-col class="text-right" cols="1">
          <v-btn variant="tonal"
                 icon="mdi-history"
                 @click="console_store.history_drawer = !console_store.history_drawer"/>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>

</style>
