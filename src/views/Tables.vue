<script setup>
import TablesDrawer from "@/components/tables/TablesDrawer.vue";

import {use_tables_store} from "@/store/tables";
import TableCard from "@/components/tables/card/TableCard.vue";

const tables_info = use_tables_store()
tables_info.update_tables()
</script>

<template>
  <h1>Tables</h1>
  <tables-drawer></tables-drawer>
  <table-card v-if="tables_info.current_open_table"></table-card>

  <v-row align-content="center" class="text-center fill-height" v-else>
    <v-spacer></v-spacer>
    <v-col align-self="center" cols="6">
      <v-sheet class="pa-10">
        <v-label><h1> Start by select a table on the left</h1></v-label>
      </v-sheet>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>

</template>

<style scoped>

</style>
