<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";
import {computed} from "vue";

const messages = {
  GREEN: {
    icon: 'mdi-check',
    color: 'green',
    msg: 'All shards (primary and replicated) are started.'
  },
  YELLOW: {
    icon: 'mdi-alert',
    color: 'orange',
    msg: 'At least one shard is under-replicated (replica shard not started or unassigned).'
  },
  RED: {
    icon: 'mdi-close-octagon',
    color: 'red',
    msg: 'At least one primary shard is missing (primary shard not started or unassigned).'
  },
  UNKNOWN: {
    icon: 'mdi-wifi-strength-alert-outline',
    color: 'warning',
    msg: ' Cannot get health info, check that you have connection or that the cluster is up'
  }
}
const nodeInfoStore = useNodeInfoStore()
const healthInfo = computed(() => {return messages[nodeInfoStore.health.getHealthLevel().health]})

</script>

<template>
  <v-card min-width="300" class="pa-5">
      <v-icon :icon="healthInfo.icon" :color="healthInfo.color"></v-icon>
      {{ healthInfo.msg }}
    <template v-for="badHealthTable in nodeInfoStore.health.getBadHealths()"
              :key="badHealthTable.tableName">
      <p class="mt-5">Found the following issues:</p>
      <template
        v-for="issue in nodeInfoStore.allocations.getBadHealthByTable(badHealthTable.tableName)"
        key="issue.shard_id">
        <div class="pa-4">
          Table `<strong>{{ issue.table_name }}</strong>` (shard {{ issue.shard_id }}):
          <v-label>{{ issue.explanation }}.</v-label><br>
          Reason: <v-label>{{ issue.decisions[0].explanations[0] }}</v-label>
        </div>
        <v-divider></v-divider>
      </template>
    </template>
  </v-card>
</template>

<style scoped>

</style>
