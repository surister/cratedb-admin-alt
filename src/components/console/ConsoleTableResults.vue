<script setup>
import {use_console_store} from "@/store/console_store";
import {adaptVTableHeader, adaptVTableItems, is_object} from "@/store/utils";
import {JsonTreeView} from "json-tree-view-vue3";
import ConsoleTableResultsToolbarActions
  from "@/components/console/ConsoleTableResultsToolbarActions.vue";
import DialogText from "@/components/shared/text/DialogText.vue";

const console_store = use_console_store()

function color_objects(object) {
  switch (typeof object) {
    case "string":
      return '#6A8759'
    case "number":
      return '#6897BB'
    case "boolean":
      return '#CC7832'
    default:
      return ''
  }
}
</script>

<template>
  <v-card
      v-if="console_store.response.data.rows.length !== 0 && console_store.response.data.rows[0].length !== 0"
      border
      class="rounded-0">
    <v-data-table
        :items="adaptVTableItems(console_store.response.data.rows, console_store.response.data.headers)"
        :headers="adaptVTableHeader(console_store.response.data.headers)"
        :items-per-page="!console_store.show_full_screen_response ? 5: 10">
      <template v-slot:top>
        <v-toolbar flat class="rounded-0">
          <v-toolbar-title>Query data response: {{ console_store.response.data.row_count }}
            record(s)
          </v-toolbar-title>
          <console-table-results-toolbar-actions/>
        </v-toolbar>
      </template>
      <template v-slot:headers="{ columns }">
        <tr>
          <th :key=column.key v-for="column in columns">{{ column.title }}</th>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="(it, index) in item" :key="index">
            <template v-if="is_object(it) || Array.isArray(it)">
              <component :is="console_store.object_representation_mode ? JsonTreeView : DialogText"
                         class="my-1"
                         colorScheme="dark"
                         rootKey="Object"
                         :maxDepth="0"
                         :data="JSON.stringify(it)"
                         :length="Object.entries(it).length"/>
            </template>
            <template v-else>
              <span :style="{color: color_objects(it)}">{{ it }} </span>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>

</style>
