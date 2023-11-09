<script setup>
import {adaptVTableHeader} from "@/store/utils";
import {use_tables_store} from "@/store/tables";
import TableCardSchema from "@/components/tables/TablesCardTabsSchema.vue";
import TablesCardTabsSample from "@/components/tables/TablesCardTabsSample.vue";

const tables_info = use_tables_store()

const table_columns_table_headers = adaptVTableHeader(
    [
      'ordinal_position', 'column_name', 'data_type', 'is_nullable', 'column_default'
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
        <table-card-schema v-if="tables_info.current_open_table_columns != null"
                           :headers="table_columns_table_headers"
                           :items="tables_info.current_open_table_columns.to_table_format()"/>
      </v-window-item>
      <v-window-item value="two">
        <tables-card-tabs-sample/>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<style scoped>

</style>
