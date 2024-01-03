<script setup>
import {adaptVTableHeader, human_file_size, separate_integer_by} from "@/store/utils";
import {use_tables_store} from "@/store/tables";
import TableCardSchema from "@/components/tables/TablesCardTabsSchema.vue";
import TablesCardTabsSample from "@/components/tables/TablesCardTabsSample.vue";
import {computed} from "vue";

const tables_info = use_tables_store()

const table_columns_table_headers = adaptVTableHeader(
  [
    'ordinal_position', 'column_name', 'data_type', 'is_nullable', 'column_default'
  ]
)

function severity_color(severity) {
  switch (severity) {
    case 1:
      return 'green'
    default:
      return 'yellow'
  }
}

const partitions_health_with_shards = computed(() => {
  // partitions_health can be 'joined' with shards on partition_ident, this can give us
  // how many records and size any given partition has - or any sys.shard column,
  // which is as much richer table than sys.health, which is where partitions_health come from.

  // In this case, we aggregate all the records and size_bytes that matched with the partition_ident.
  for (const partition of tables_info.current_open_table.partitions_health) {
    const shards = tables_info.current_open_table.shards.filter((shard) => shard.partition_ident === partition.partition_ident)

    partition['records'] = shards.reduce((partial_sum, val) => partial_sum + val['records'], 0)
    partition['size'] = shards.reduce((partial_sum, val) => partial_sum + val['size_bytes'], 0)
  }
  return tables_info.current_open_table.partitions_health
})

const show_tab = computed(() => {
  if (tables_info.current_open_schema.is_system) {
    return false
  }
  return tables_info.current_open_table.partitions_health.length <= 1
})


</script>

<template>
  <v-tabs v-model="tables_info.current_tab">
    <v-tab value="one">Schema</v-tab>
    <v-tab value="two" @click="tables_info.update_table_sample_data()">Sample Data</v-tab>
    <v-tab value="three" :disabled="show_tab">Partitions</v-tab>
  </v-tabs>
  <v-card-text>
    <v-window v-model="tables_info.current_tab">
      <v-window-item value="one">
        <table-card-schema v-if="tables_info.current_open_table_columns"
                           :headers="table_columns_table_headers"
                           :items="tables_info.current_open_table_columns.to_table_format()"/>
      </v-window-item>
      <v-window-item value="two">
        <tables-card-tabs-sample/>
      </v-window-item>
      <v-window-item value="three" v-if="!tables_info.current_open_schema.is_system">
        <v-chip class="mt-2 ml-2" label>
          Partitioned by: {{ tables_info.current_open_table.partitioned_by }}
        </v-chip>
        <v-data-table
          :headers="adaptVTableHeader(['health', 'severity', 'partition_ident', 'missing_shards', 'underreplicated_shards', 'records', 'size'])"
          density="comfortable"
          :items="partitions_health_with_shards">
          <template v-slot:item.health="{ value }">
            <v-chip :color="value.toLowerCase()" label>
              {{ value }}
            </v-chip>
          </template>
          <template v-slot:item.severity="{ value }">
            <v-chip :color="severity_color(value)" label>
              {{ value }}
            </v-chip>
          </template>
          <template v-slot:item.records="{ value }">
            {{ separate_integer_by(value, ' ') }}
          </template>
          <template v-slot:item.size="{ value }">
            {{ human_file_size(value) }}
          </template>
        </v-data-table>

      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<style scoped>

</style>
