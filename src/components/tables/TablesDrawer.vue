<script setup>
import InnerTablesDrawer from "@/components/tables/InnerTablesDrawer.vue";
import {ref} from "vue";

const show_search = ref(false)
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
            <v-btn class="ml-10" icon="mdi-text-search" @click="show_search = !show_search" flat/>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>

      <Suspense>
        <inner-tables-drawer :show-search="show_search"/>
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
