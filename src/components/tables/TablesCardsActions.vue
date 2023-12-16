<script setup>
import {use_tables_store} from "@/store/tables";
import {use_console_store} from "@/store/console_store";
import {useRouter} from "vue-router";
import TableCardActionDropTable from "@/components/tables/TableCardActionDropTable.vue";
import TableCardActionRenameTable from "@/components/tables/TableCardActionRenameTable.vue";
import TablesCardActionsShowCreate from "@/components/tables/TablesCardActionsShowCreate.vue";

const table_store = use_tables_store()
const console_store = use_console_store()

const router = useRouter()

async function f() {
  const query = `SELECT * \nFROM "${table_store.current_open_table.schema}"."${table_store.current_open_table.name}"`
  await router.push({
    name: 'console',
    query: {query: query}
  }).then(() => console_store.current_console.content = query)
}
</script>

<template>
  <v-row class="py-4">
    <v-col>
      <tables-card-actions-show-create></tables-card-actions-show-create>
      <v-btn flat
             class="ml-1"
             @click="f();"
             text="query table"/>
      <table-card-action-rename-table/>
      <table-card-action-drop-table/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
