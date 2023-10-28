<script setup>

import {adaptVTableHeader, adaptVTableItems, color_objects} from "@/store/utils";
import {use_tables_store} from "@/store/tables";
import TableCardSchema from "@/components/tables/card/TableCardSchema.vue";

const tables_info = use_tables_store()

const table_columns_table_headers = adaptVTableHeader(
    [
      'ordinal_position', 'column_name', 'data_type', 'is_nullable'
    ]
)
</script>

<template>
  <v-tabs v-model="tables_info.current_tab">
    <v-tab value="one">Schema</v-tab>
    <v-tab value="two" @click="tables_info.update_table_sample_data()">Sample Data</v-tab>
  </v-tabs>
  <v-card-text>
    <v-window v-model="tables_info.current_tab">
      <v-window-item value="one">
        <table-card-schema
            v-if="tables_info.current_open_table_columns != null"
            :headers="table_columns_table_headers"
            :items="tables_info.current_open_table_columns.toVDataItems()"
        ></table-card-schema>
      </v-window-item>
      <v-window-item value="two">
        <v-data-table v-if="tables_info.sample_data != null"
                      :headers="adaptVTableHeader(tables_info.sample_data.cols)"
                      :items="adaptVTableItems(tables_info.sample_data.rows, tables_info.sample_data.cols)">
          <template v-slot:item="{ item }">
            <tr>
              <td v-for="it, index in item" :key="index">
                <span :style="{color: color_objects(it)}">{{ it }}</span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<style scoped>

</style>
