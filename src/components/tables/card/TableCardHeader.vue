<script setup>
import TablesColumnText from "@/components/tables/card/TableColumnText.vue";
import {use_tables_store} from "@/store/tables";
import {human_file_size} from "@/store/utils";

const tables_info = use_tables_store()

</script>

<template>
    <v-row align-content="center">
      <v-col align-self="center">
        <h2 class="font-weight-bold ml-4">
            <span class="text-blue-accent-1">{{
                tables_info.current_open_table.schema
              }}</span>.{{ tables_info.current_open_table.name }}
        </h2>
      </v-col>
      <v-spacer></v-spacer>

    </v-row>
    <v-row class="pt-1">
      <tables-column-text title="Records" :value="tables_info.current_open_table.records"/>
      <tables-column-text title="Shards" :value="tables_info.current_open_table.shards"/>
      <tables-column-text title="Replicas" :value="tables_info.current_open_table.replicas"/>
      <tables-column-text title="Total size" :value="human_file_size(tables_info.current_open_table.size_bytes)"/>
    </v-row>
    <v-row>
      <tables-column-text title="Underreplicated shards"/>
    </v-row>

</template>

<style scoped>

</style>
