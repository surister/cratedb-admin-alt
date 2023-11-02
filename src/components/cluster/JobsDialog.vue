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
let filter_created_by_admin = ref(false)

watch(
  () => props.is_open, (prev) => {
    _is_open.value = prev
  }
)

const node_info_store = useNodeInfoStore()

let jobs = computed(() => {
  let _jobs = node_info_store.jobs.get_jobs_by_node(props.cluster_name)
  if (filter_created_by_admin.value === true){
    _jobs = _jobs.filter((job) => !job.is_from_admin_ui())
  }
  return _jobs
})

const table_headers = adaptVTableHeader([
  'Id',
  'Created by admin ui',
  'Node name',
  'Started',
  'Stmt',
  'Username',
  'Actions'
])

</script>

<template>
  <v-dialog class="w-75"
            min-height="600"
            v-model="_is_open"
            @update:modelValue="$emit('update:is_open', false)">
    <v-card>
      <v-toolbar>
        <h3 class="ml-4">Jobs for {{ cluster_name }} cluster</h3>
        <vertical-divider/>
        <h3>Live update</h3>
        <v-progress-circular
            class="ml-3"
            color="red"
            model-value="100"
            width="5"
            size="20"
            indeterminate/>
      </v-toolbar>
      <v-card-text>
        <v-switch v-model="filter_created_by_admin" color="primary">
          <template #label>
            <v-label>Hide created by admin ui</v-label>
            <v-tooltip text="In order to show you live data this admin ui queries your
             CrateDB cluster every few seconds, some jobs shown here might not be relevant for you.
              Queries from the console will not be hidden.">
              <template v-slot:activator="{ props }">
                <v-btn
                    class="ml-3"
                    v-bind="props"
                    icon="mdi-information-outline"
                    variant="text"/>
              </template>
            </v-tooltip>
          </template>
        </v-switch>
        <v-data-table :headers="table_headers"
                      :items="jobs"
                      no-data-text="No jobs running">
          <template v-slot:[`item.node_name`]="{ item }">
            {{ item.node.name }}
          </template>
          <template v-slot:[`item.created_by_admin_ui`]="{ item }">
            <v-icon :icon="item.is_from_admin_ui() ? 'mdi-check': 'mdi-cross'"/>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip text="Kill job">
              <template v-slot:activator="{ props }">
                <v-btn
                    :disabled="item.is_from_admin_ui()"
                    v-bind="props"
                    variant="text"
                    color="red"
                    icon="mdi-close-circle"/>
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
