<script setup>
import {use_console_store} from "@/store/console_store";
import {adaptVTableHeader, adaptVTableItems, is_object} from "@/store/utils";
import {JsonTreeView} from "json-tree-view-vue3";
import ConsoleTableResultsToolbarActions
  from "@/components/console/ConsoleTableResultsToolbarActions.vue";
import DialogText from "@/components/shared/text/DialogText.vue";
import {ref} from "vue";

const console_store = use_console_store()

const props = defineProps({
  data: {
    type: Object
  }
})

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

const is_clicked = ref()
</script>

<template>
  <template v-if="data.rows && data.rows.length !== 0">
    <v-card v-if="data.rows[0].length !== 0" class="rounded-0">

      <v-data-table :items="adaptVTableItems(data.rows, data.headers)"
                    :headers="adaptVTableHeader(data.headers)"
                    :items-per-page="!console_store.show_full_screen_response ? 5: 10"
                    class="border-sm tabular">

        <template v-slot:top>
          <v-toolbar flat class="rounded-0 bg-surface border-b-sm">
            <v-toolbar-title>Query data response: {{ data.row_count }}
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

        <template v-slot:item="{ item, index }">
          <tr>
            <td v-for="(data, column_name) in item" :key="index + column_name" @click="is_clicked = index + column_name" :class="[is_clicked === index + column_name ? 'is_clicked': '']">
              <template v-if="is_object(data) || Array.isArray(data)">
                <component
                  :is="console_store.object_representation_mode ? JsonTreeView : DialogText"
                  class="my-1"
                  colorScheme="dark"
                  rootKey="Object"
                  :maxDepth="0"
                  :data="JSON.stringify(data)"
                  :length="Object.entries(data).length"/>
              </template>
              <template v-else>
                <span :style="{color: color_objects(data)}">{{ data }} </span>
              </template>
            </td>
          </tr>
        </template>

      </v-data-table>

    </v-card>
  </template>
</template>

<style scoped>

.tabular td, th {
  border-inline-end-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-inline-end-style: solid;
  border-inline-end-width: 1px;
}

.is_clicked {
  border: cornflowerblue solid 2px !important;
}

.tabular td:hover {
  border: cornflowerblue solid 2px !important;
}

.tabular .v-data-table-footer {
  border-top: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px;
}

</style>
