<script setup>
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import ConsoleActions from "@/components/console/ConsoleActions.vue";
import ConsoleTabs from "@/components/console/ConsoleTabs.vue";

import {use_console_store} from "@/store/console_store";

import ConsoleHistoryDrawer from "@/components/console/ConsoleHistoryDrawer.vue";
import ConsoleEditor from "@/components/console/ConsoleEditor.vue";

const console_store = use_console_store()
</script>

<template>

  <console-history-drawer/>

  <v-row no-gutters>
    <v-col>
      <console-tabs></console-tabs>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col>
      <console-actions></console-actions>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col>
      <div class="border-sm rounded-b">
        <console-editor v-model:content="console_store.current_console.content"
                        @keydown.shift.enter.prevent="() => {
            if(console_store.current_console.content !== ''){console_store.query_from_console()
                  }
      }"
        />
        <console-response :data="console_store.current_console.response"/>
        <console-table-results :data="console_store.current_console.response.data"/>
      </div>
    </v-col>
  </v-row>

  <!-- Dialog -->
  <v-dialog v-model="console_store.show_full_screen_response">
    <console-table-results
      :data="console_store.current_console.response.data"
      v-if="console_store.show_full_screen_response"/>
  </v-dialog>

</template>

<style scoped>

</style>
