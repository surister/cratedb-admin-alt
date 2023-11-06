<script setup>
import {ref} from "vue";
import InnerTablesDrawerAddTable from "@/components/tables/TablesDrawerSuspensedContentAddTable.vue";
import TablesDrawerSuspensedContent from "@/components/tables/TablesDrawerSuspensedContent.vue";

const show_search = ref(false)
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>

        <v-row no-gutters>
          <v-label>Tables</v-label>
          <v-spacer></v-spacer>
          <inner-tables-drawer-add-table/>
          <v-btn class="" icon="mdi-table-search" @click="show_search = !show_search" flat/>
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
