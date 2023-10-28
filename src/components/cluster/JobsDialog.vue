<script setup>
import {computed, ref, watch} from "vue";
import {useNodeInfoStore} from "@/store/nodeInfo";
import {adaptVTableHeader} from "@/store/utils";
import VerticalDivider from "@/components/shared/VerticalDivider.vue";

let props = defineProps({
  is_open: Boolean,
  cluster_name: String
})
let _is_open = ref(props.is_open)
watch(
  () => props.is_open, (prev) => {
    _is_open.value = prev
  }
)

const nodeInfoStore = useNodeInfoStore()

let jobs = computed(() => {
  return nodeInfoStore.jobs.get_job_by_node(props.cluster_name)
})

const table_headers = adaptVTableHeader([
  'Id', 'Node name', 'Started', 'Stmt', 'User', 'Actions'
])
</script>

<template>
  <v-dialog class="w-75" v-model="_is_open" @update:modelValue="$emit('update:is_open', false)">
    <v-card>
      <v-toolbar>
        <h3 class="ml-4">Jobs for {{ cluster_name }} cluster</h3>
        <vertical-divider></vertical-divider>
        <h3>Live update</h3>
        <v-progress-circular class="ml-3" color="red" model-value="100" width="5" size="20"
                             indeterminate>
        </v-progress-circular>
      </v-toolbar>
      <v-card-text>
        <v-data-table :headers="table_headers"
                      :items="jobs"
                      no-data-text="No jobs running"
        >
          <template v-slot:[`item.node_name`]="{ item }">
            {{ item.node.name }}
          </template>
          <template v-slot:[`item.actions`]>
            <v-tooltip text="Kill job">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  color="red"
                  icon="mdi-close-circle"
                ></v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Close"
          @click="$emit('update:is_open', false)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
