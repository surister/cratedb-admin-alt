<script setup>

import {useNodeInfoStore} from "@/store/nodeInfo";

const props = defineProps(
  {
    color: String,
    icon: String,
    message: String,
    healths: Array[Object],
    allocations_by_health: Array[Object]
  }
)
const nodeInfoStore = useNodeInfoStore()
</script>

<template>
  <v-card min-width="300" class="pa-5">
      <v-icon :icon="icon" :color="color"></v-icon>
      {{ message }}
    <template v-for="health in healths"
              :key="health.tableName">
      <p class="mt-5 pb-4">Found the following issues:</p>
      <template
        v-for="issue in nodeInfoStore.allocations.getBadHealthByTable(health.tableName)"
        :key="issue.shard_id">
        <v-divider></v-divider>
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
