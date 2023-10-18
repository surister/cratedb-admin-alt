<script setup>

import {use_tables_store} from "@/store/tables";
import {human_file_size, human_numbers} from "@/store/utils";


const tables_info = use_tables_store()

</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>
        <v-row no-gutters>
          <v-col align-self="center">
            <v-label>Tables</v-label>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn icon="mdi-cog" flat></v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>
      <v-list-group fluid v-for="schema in tables_info.schemas.schemas" :key="schema">
        <v-divider/>
        <v-list-item :value="table.name"
                     :key="table.name"
                     v-for="table in schema.tables"
                     class="pl-4"
                     @click="tables_info.current_open_table = table">
          <template #title>
            <strong>{{ table.name }} </strong>
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
            :title="schema.name"
            :subtitle="`${schema.tables.length} tables - 304MB`">
            <template #subtitle>
              {{ schema.tables.length }} tables - Size: {{
                human_file_size(schema.get_size_bytes())
              }}
            </template>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
