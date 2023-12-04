<script setup>
import RepositoriesDrawer from "@/components/repositories/RepositoriesDrawer.vue";
import {use_repositories_store} from "@/store/repositories";
import RepositoriesCard from "@/components/repositories/RepositoriesCard.vue";

const repository_store = use_repositories_store()
</script>

<template>
  <repositories-drawer/>
  <repositories-card/>
</template>

<style scoped>

</style>
