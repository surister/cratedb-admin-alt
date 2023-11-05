<script setup>
import { JsonTreeView } from "json-tree-view-vue3";
import {adaptVTableHeader, adaptVTableItems, color_objects, is_object} from "@/store/utils";
import {use_tables_store} from "@/store/tables";

const tables_info = use_tables_store()
</script>

<template>
  <v-data-table v-if="tables_info.sample_data != null"
                :headers="adaptVTableHeader(tables_info.sample_data.cols)"
                :items="adaptVTableItems(tables_info.sample_data.rows, tables_info.sample_data.cols)">
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="(it, index) in item" :key="index">
            <template v-if="is_object(it) || Array.isArray(it)">
              <json-tree-view class="my-1" colorScheme="dark" rootKey="Object" maxDepth="0" :data="JSON.stringify(it)"></json-tree-view>
            </template>
            <template v-else>
              <span :style="{color: color_objects(it)}">{{ it }} </span>
            </template>
          </td>
        </tr>
      </template>
  </v-data-table>
</template>

<style scoped>

</style>
