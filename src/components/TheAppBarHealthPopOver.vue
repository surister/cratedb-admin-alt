<script setup>

import {use_node_info_store} from "@/store/node_info";
import {computed} from "vue";

const node_info_store = use_node_info_store()

// eslint-disable-next-line no-unused-vars
const props = defineProps(
    {
      color: String,
      icon: String,
      message: String,
      healths: Array[Object],
      allocations_by_health: Array[Object]
    }
)

const allocation_issues = computed(() =>{
  let t = []
  for (const issue of node_info_store.allocations.get_issues_by_table(health.tableName)) {
    t.push(issue)
  }
})
</script>

<template>
  <v-card min-width="300" class="pa-5">
    <v-icon :icon="icon"
            :color="color"/>
    <v-label class="ml-2"
             :text="message"/>
    <template v-for="health in healths"
              :key="health.tableName">
      <p class="mt-5 pb-4">Found the following allocation issues issues on <span class="font-weight-bold">{{ health.table_name }}</span>:</p>
      <p>There are {{ health.missing_shards }} missing shards and {{ health.under_replicated_shards }} under replicated shards.</p>
      <template v-for="issue in node_info_store.allocations.get_issues_by_table(health.tableName)" :key="issue.shard_id">
        <v-divider/>
        {{ healths }}
        <div class="pa-4">
          Table `<strong>{{ issue.table_name }}</strong>` (shard {{ issue.shard_id }}):
          <v-label>{{ issue.explanation }}.</v-label>
          <br>
          Reason:
          <template v-if="issue.decisions != null">
            <v-label style="max-width: 500px">{{ issue.decisions[0].explanations[0] }}</v-label>
          </template>
          <template v-else>
            Not explained by the node.
          </template>
        </div>

      </template>
    </template>
  </v-card>
</template>

<style scoped>

</style>
