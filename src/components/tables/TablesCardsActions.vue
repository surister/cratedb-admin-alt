<script setup>
import {use_tables_store} from "@/store/tables";
import {use_console_store} from "@/store/console_store";
import {useRouter} from "vue-router";
import TableCardActionDropTable from "@/components/tables/TableCardActionDropTable.vue";
import TableCardActionRenameTable from "@/components/tables/TableCardActionRenameTable.vue";

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
      <v-dialog max-width="600">
        <template v-slot:activator="{ props }">
          <v-btn :disabled="table_store.current_open_schema.is_system"
                 @click="table_store.show_create_table()"
                 v-bind="props"
                 flat
                 text="show create">
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar>
              <v-toolbar-title>
                <h2 class="font-weight-bold ml-4">
            <span class="text-blue-accent-1">
              {{
                table_store.current_open_table.schema
              }}</span>.{{ table_store.current_open_table.name }}
                </h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <pre>{{ table_store.current_show_create_table }}</pre>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer/>
              <v-btn text="Close"
                     @click="isActive.value = false"/>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
