<script setup>
import {human_file_size, human_numbers} from "@/store/utils";

import {use_tables_store} from "@/store/tables";

const tables_info = use_tables_store()
await tables_info.update_tables()
</script>

<template>
  <v-list-group ref="shit" fluid v-for="schema in tables_info.schemas.schemas" :key="schema">
    <v-divider/>
    <v-list-item :value="schema.name + i"
                 :key="schema.name + i"
                 v-for="(table, i) in schema.tables"
                 class="pl-4"
                 @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">
      <template #title>
        <v-tooltip
            :text="schema.is_system ? 'Belongs to CrateDB system schema.' : 'Created by user'">
          <template v-slot:activator="{ props }">
            <v-chip
                v-bind="props"
                :variant="'outlined'"
                size="x-small"
                :color="schema.is_system ? 'pink' : table.table_type === 'VIEW' ? 'yellow' : 'blue'">
              {{ table.table_type === 'VIEW' ? 'view' : 'table' }}
            </v-chip>
          </template>
        </v-tooltip>
        <span class="font-weight-bold ml-2">{{ table.name }}</span>
      </template>
      <template #subtitle>
        {{ table.records == null ? 'n/a' : human_numbers(table.records) }} records - Size
        {{ table.size_bytes != null ? human_file_size(table.size_bytes) : 'n/a' }}
      </template>
      <template #prepend>
        <span class="ml-4"></span>
      </template>
    </v-list-item>
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          :title="schema.name">
        <template #subtitle>
          {{ schema.tables.length }} tables <span v-if="!schema.is_system"> - Size: {{
            human_file_size(schema.get_size_bytes())
          }}</span>
        </template>
      </v-list-item>
    </template>
  </v-list-group>
</template>

<style scoped>

</style>
