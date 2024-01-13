<script setup>
import TablesCardHeader from "@/components/tables/TablesCardHeader.vue";
import TablesCardActions from "@/components/tables/TablesCardsActions.vue";
import TableCardTabs from "@/components/tables/TablesCardTabs.vue";
</script>

<template>
  <v-card class="pa-5"
          border="sm">

    <template #title>
      <tables-card-header/>
    </template>

    <v-divider/>

    <tables-card-actions/>

    <v-divider/>

    <table-card-tabs/>
  </v-card>
</template>

<style scoped>

</style>
