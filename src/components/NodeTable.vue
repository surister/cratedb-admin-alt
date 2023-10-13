<script setup>

import {ref} from "vue";
import {adaptVTableHeader, humanFileSize} from "@/store/utils";
import {useNodeInfoStore} from "@/store/nodeInfo";
import CollapsibleText from "@/components/objectrepresentation/CollapsibleText.vue";
import DialogText from "@/components/objectrepresentation/DialogText.vue";
import TitledText from "@/components/text/TitledText.vue";

let expanded = ref([])
let nodeStore = useNodeInfoStore();
const headers = adaptVTableHeader([
  'Node name',
  'Version',
  'HTTP Endpoint',
  'Os Info',
  'Load',
  'Heap Usage',
  'Disk Usage',
])
</script>

<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="nodeStore.nodes.toVDataItems()"
    item-value="name"
    class="elevation-1 overflow-visible">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Nodes</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          More info about {{ item.node_name.name }}
        </td>
      </tr>
    </template>
    <template v-slot:[`item.node_name`]="{ value }">
      <v-row class="">
        <v-col>
          <v-tooltip :text="value.is_master ? 'Master node' : 'Not Master'">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" prepend-icon="mdi-star-check"
                     :ripple="false">{{
                  value.name
                }}
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </template>
    <template v-slot:[`item.version`]="{ value }">
      <v-chip color="red">
        {{ value.number }}
      </v-chip>
    </template>
    <template v-slot:[`item.http_endpoint`]="{ value }">
      <v-chip color="danger">
        <a :href="`http://${value}`">{{ value }}</a>
      </v-chip>
    </template>
    <template v-slot:[`item.os_info`]="{ value }">
      <div class="pa-2">
        <titled-text title="Available Cores" :text="value.available_processors"></titled-text>
        <titled-text title="Architecture" :text="value.arch"></titled-text>
      </div>
    </template>
    <template v-slot:[`item.heap_usage`]="{ value }">
      <v-progress-linear :model-value="(value.used / value.max) * 100"
                         class="mt-4"></v-progress-linear>
      <p class="pt-3"> Used: <strong>{{ humanFileSize(value.used) }}</strong></p>
      <p>Free: <strong>{{ humanFileSize(value.free) }}</strong></p>
      <p>Max: <strong>{{ humanFileSize(value.max) }}</strong></p>
    </template>
    <template v-slot:[`item.load`]="{ value }">
      <p class="pt-3">Load 1min: <strong>{{ value.load1 }} </strong></p>
      <p>Load 5min: <strong>{{ value.load5 }} </strong></p>
      <p>Load 15min: <strong>{{ value.load15 }} </strong></p>
    </template>
    <template v-slot:[`item.disk_usage`]="{ value }">
      <v-progress-linear :model-value="(value.disks[0].used / value.disks[0].size) * 100"
                         class="mt-4"></v-progress-linear>
      <p class="pt-3">Available: <strong>{{
          humanFileSize(value.disks[0].available)
        }} </strong></p>
      <p>Used: <strong>{{ humanFileSize(value.disks[0].used) }} </strong></p>
      <p>Size: <strong>{{ humanFileSize(value.disks[0].size) }} </strong></p>
    </template>
  </v-data-table>

</template>

<style>

</style>
