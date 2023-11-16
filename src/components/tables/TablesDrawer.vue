<script setup>
import {ref} from "vue";
import InnerTablesDrawerAddTable
  from "@/components/tables/TablesDrawerSuspensedContentAddTable.vue";
import TablesDrawerSuspensedContent from "@/components/tables/TablesDrawerSuspensedContent.vue";
import {use_tables_store} from "@/store/tables";

const tables_store = use_tables_store()
const show_search = ref(false)
</script>

<template>
  {{ tables_store.drawer_opened_tabs }}
  <v-navigation-drawer permanent>
    <v-list v-model:opened="tables_store.drawer_opened_tabs">
      <v-list-item>
        <v-row no-gutters>
          <v-label text="tables"/>
          <v-spacer/>
          <inner-tables-drawer-add-table/>
          <v-btn icon="mdi-table-search" @click="show_search = !show_search" flat/>
        </v-row>
      </v-list-item>

      <v-divider/>

      <Suspense>
        <TablesDrawerSuspensedContent :show-search="show_search"/>
        <template #fallback>
            <span>
              <v-skeleton-loader type="list-item-two-line" v-for="_ in 3" :key="_"/>
            </span>
        </template>
      </Suspense>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
