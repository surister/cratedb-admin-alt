<script setup>
import {adaptVTableHeader, adaptVTableItems, color_objects} from "@/store/utils";
import {use_tables_store} from "@/store/tables";

const tables_info = use_tables_store()
</script>

<template>
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
</template>

<style scoped>

</style>
