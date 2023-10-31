<script setup>


import InnerTablesDrawer from "@/components/tables/InnerTablesDrawer.vue";
import {inRange} from "eslint-plugin-vue/lib/utils";
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>
        <v-row no-gutters>
          <v-col align-self="center">
            <v-label>Tables</v-label>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn icon="mdi-cog" flat v-show="false"></v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>

        <Suspense>
          <inner-tables-drawer/>
          <template #fallback>
            <span>
              <v-skeleton-loader type="list-item-two-line" v-for="_ in 3"/>
            </span>

          </template>
        </Suspense>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
