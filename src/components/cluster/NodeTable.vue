<script setup>
import {ref} from "vue";
import {adaptVTableHeader, human_file_size} from "@/store/utils";
import {use_node_info_store} from "@/store/node_info";

import TitledText from "@/components/shared/text/TitledText.vue";
import JobsDialog from "@/components/cluster/NodeTableJobsDialog.vue";

let expanded = ref([])
let node_info_store = use_node_info_store();
let jobs_dialog = ref(false)
let jobs_cluster = ref('')
const headers = adaptVTableHeader([
  'Node name',
  'Version',
  'HTTP Endpoint',
  'Os Info',
  'Load',
  'Heap Usage',
  'Disk Usage',
  'Actions'
])

</script>

<template>
  <v-card border="sm"
          rounded="0">

    <v-data-table v-model:expanded="expanded"
                  :headers="headers"
                  :items="node_info_store.nodes.to_table_format()"
                  item-value="name"
                  class="overflow-visible">

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
            <v-tooltip :text="value.is_master ? 'Master node' : 'Not master'">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props"
                       variant="text"
                       :prepend-icon="value.is_master ? 'mdi-star-check': 'mdi-circle-double'"
                       :color="value.is_master ? 'yellow': ''"
                       :ripple="false">{{ value.name }}
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
        <p class="pt-3"> Used: <strong>{{ human_file_size(value.used) }}</strong></p>
        <p>Free: <strong>{{ human_file_size(value.free) }}</strong></p>
        <p>Max: <strong>{{ human_file_size(value.max) }}</strong></p>
      </template>

      <template v-slot:[`item.load`]="{ value }">
        <p class="pt-3">Load 1min: <strong>{{ value.load1 }} </strong></p>
        <p>Load 5min: <strong>{{ value.load5 }} </strong></p>
        <p>Load 15min: <strong>{{ value.load15 }} </strong></p>
      </template>

      <template v-slot:[`item.disk_usage`]="{ value }">
        <v-progress-linear :model-value="(value.disks[0].used / value.disks[0].size) * 100"
                           class="mt-4"/>
        <p class="pt-3">Available: <strong>{{
            human_file_size(value.disks[0].available)
          }} </strong></p>
        <p>Used: <strong>{{ human_file_size(value.disks[0].used) }} </strong></p>
        <p>Size: <strong>{{ human_file_size(value.disks[0].size) }} </strong></p>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip text="View jobs">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click="jobs_cluster = item.node_name.name; jobs_dialog = !jobs_dialog"
              variant="flat"
              icon="mdi-clipboard-list"/>
          </template>
        </v-tooltip>
      </template>

    </v-data-table>

    <jobs-dialog v-model:is_open="jobs_dialog"
                 :cluster_name="jobs_cluster"/>
  </v-card>
</template>

<style>

</style>
