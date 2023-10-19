<script setup>
import TablesCardHeader from "@/components/tables/card/TableCardHeader.vue";
import TablesCardActions from "@/components/tables/card/TableCardActions.vue";
import TableCardTabs from "@/components/tables/card/TableCardTabs.vue";

</script>

<template>
  <v-card class="mt-5 pa-5">
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
