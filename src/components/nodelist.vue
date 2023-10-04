<script setup>

import {reactive, ref} from "vue";
import {adaptVTableHeader} from "@/store/utils";
import {useNodeInfoStore} from "@/store/nodeInfo";

let expanded = ref([])
let nodeStore = useNodeInfoStore();
const headers = adaptVTableHeader([
  'Node',
  'HTTP Endpoint',
  'CPU Cores',
  'Load',
  'Heap Usage',
  'Disk Usage',
  'Disk Operations',
  'Shards',
])

</script>

<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="nodeStore.nodes.toVDataItems()"
    item-value="name"
    show-expand
    class="elevation-1 overflow-visible">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Nodes</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          More info about {{ item.node.name }}
        </td>
      </tr>
    </template>
    <template v-slot:[`item.node`]="{ value }">
      <v-row class="pt-3 pb-3">
        <v-col>
          <v-label class="font-weight-bold">{{ value.name }}</v-label>
          <v-label class="text-grey-darken-1">{{ value.name }}</v-label>
          <v-chip color="red mt-2">
            {{ value.name }}
          </v-chip>


        </v-col>

      </v-row>


    </template>
    <template v-slot:[`item.http_endpoint`]="{ value }">
      <v-chip color="danger">
        {{ value }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<style >

</style>
