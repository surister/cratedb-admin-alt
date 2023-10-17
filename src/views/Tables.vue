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
  <table-card></table-card>
</template>

<style scoped>

</style>
