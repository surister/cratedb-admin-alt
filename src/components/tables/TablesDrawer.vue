<script setup>
import {ref} from "vue";
import InnerTablesDrawerAddTable
  from "@/components/tables/TablesDrawerSuspensedContentAddTable.vue";
import TablesDrawerSuspensedContent from "@/components/tables/TablesDrawerSuspensedContent.vue";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const show_search = ref(false)
const stored_preferences = use_stored_preferences_store()
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list v-model:opened="stored_preferences.tables_drawer_opened" :mandatory="true">
      <v-list-item>
        <v-row no-gutters>

          <v-label text="tables"/>

          <v-spacer/>

          <inner-tables-drawer-add-table/>

            <v-tooltip text="Filter tables" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-table-search"
                       @click="show_search = !show_search"
                       v-bind="props"
                       size="small"
                       flat/>
              </template>
            </v-tooltip>

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
