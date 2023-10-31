<script setup>
import TablesDrawer from "@/components/tables/TablesDrawer.vue";
import TableCard from "@/components/tables/card/TableCard.vue";

import {use_tables_store} from "@/store/tables";
import {onBeforeMount} from "vue";

const tables_info = use_tables_store()

onBeforeMount(async ()=>{
    await tables_info.update_tables()
})
</script>

<template>
  <h1>Tables</h1>
  <tables-drawer/>
  <table-card v-if="tables_info.current_open_table"/>
  <v-row align-content="center" class="text-center fill-height" v-else>
    <v-spacer/>
    <v-col align-self="center" cols="6">
      <v-sheet class="pa-10">
        <v-label><h1> Start by select a table on the left</h1></v-label>
      </v-sheet>
    </v-col>
    <v-spacer/>
  </v-row>
</template>

<style scoped>

</style>
