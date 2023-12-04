<script setup>

import {use_node_info_store} from "@/store/node_info";

const node_info_store = use_node_info_store()

// eslint-disable-next-line no-unused-vars
const props = defineProps(
    {
      color: String,
      icon: String,
      message: String,
      unhealthy_tables: Array[Object],
      allocations_by_health: Array[Object]
    }
)

</script>

<template>
  <v-card min-width="300" max-width="800">
    <v-container class="pa-5">
      <v-icon :icon="icon"
              :color="color"/>

      <v-label class="ml-2"
               :text="message"/>
    </v-container>

    <template v-for="health in unhealthy_tables"
              :key="health.table_name">

      <v-expansion-panels class="border-sm elevation-0 border-0">
        <v-expansion-panel rounded="0">
          <v-expansion-panel-title>
            <p>Table
              <span class="font-weight-bold text-h6">"{{ health.table_name }}"</span>
              has <span class="text-red">{{ health.missing_shards }}</span> missing shards and
              <span class="text-red">{{ health.under_replicated_shards }}</span> under
              replicated
              shards.</p>

          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <template
              v-for="issue in node_info_store.allocations.get_issues_by_table(health.table_name)"
              :key="issue.shard_id">

              <v-divider/>

              <div class="pa-2" v-if="issue.current_state !== 'STARTED'">
                State: {{ issue.current_state }}
                (shard {{ issue.shard_id }}):
                <v-label>{{ issue.explanation }}.</v-label>

                <br>

                Reason:

                <template v-if="issue.decisions">
                  {{ issue.decisions[0].explanations[0] }}
                </template>

                <template v-else>
                  Not explained by the node.
                </template>

              </div>
            </template>
          </v-expansion-panel-text>

        </v-expansion-panel>
      </v-expansion-panels>

    </template>

  </v-card>
</template>

<style scoped>

</style>
