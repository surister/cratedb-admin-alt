<script setup>
import {use_console_store} from "@/store/console_store";
import {adaptVTableHeader, adaptVTableItems, is_object} from "@/store/utils";

import DialogText from "@/components/shared/object_representation/DialogText.vue";
import DownloadBtn from "@/components/console/ConsoleResponseDownloadBtn.vue";

const consoleStore = use_console_store()

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
      v-if="consoleStore.response.data.rows.length !== 0 && consoleStore.response.data.rows[0].length !== 0">
    <v-data-table
        :items="adaptVTableItems(consoleStore.response.data.rows, consoleStore.response.data.headers)"
        :headers="adaptVTableHeader(consoleStore.response.data.headers)"
        :items-per-page="!consoleStore.show_full_screen_response ? 5: 10">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Query data response: {{ consoleStore.response.data.row_count }} record(s)</v-toolbar-title>
          <v-btn @click="consoleStore.show_raw_response = !consoleStore.show_raw_response" text="View raw"/>
          <download-btn/>
          <v-btn v-if="!consoleStore.show_full_screen_response"
                 icon="mdi-fullscreen"
                 @click="consoleStore.show_full_screen_response = !consoleStore.show_full_screen_response"/>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="(it, index) in item" :key="index">
            <template v-if="is_object(it) || Array.isArray(it)">
              <dialog-text :object="it"></dialog-text>
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
