<script setup>
import {use_tables_store} from "@/store/tables";
import TablesCardHeader from "@/components/tables/card/TableCardHeader.vue";
import TablesCardActions from "@/components/tables/card/TableCardActions.vue";
import TableCardTabs from "@/components/tables/card/TableCardTabs.vue";

const tables_info = use_tables_store()
</script>

<template>
  <v-card class="mt-5 pa-5" v-if="tables_info.current_open_table">
    <template #title>
      <tables-card-header></tables-card-header>
    </template>
    <v-divider/>
    <tables-card-actions></tables-card-actions>
    <v-divider/>
    <table-card-tabs></table-card-tabs>
  </v-card>
</template>

<style scoped>

</style>
