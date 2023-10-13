<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import {adaptVTableHeader, adaptVTableItems, isArray, isObject} from "@/store/utils";
import DialogText from "@/components/objectrepresentation/DialogText.vue";
import CollapsibleText from "@/components/objectrepresentation/CollapsibleText.vue";

const consoleStore = useConsoleStore()
function colorObject(object) {
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
<v-card>
    <v-data-table
    :items="adaptVTableItems(consoleStore.response.data.rows, consoleStore.response.data.headers)"
    :headers="adaptVTableHeader(consoleStore.response.data.headers)">
    <template v-slot:item="{ item }">
      <tr>
        <td v-for="it, index in item" :key="index">
          <template v-if="isObject(it) || isArray(it)">
            <dialog-text :object="it"></dialog-text>
          </template>
          <template v-else>
            <span :style="{color: colorObject(it)}">{{ it }} </span>
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</v-card>

</template>

<style scoped>

</style>
