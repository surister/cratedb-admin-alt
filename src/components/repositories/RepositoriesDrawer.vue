<script setup>
import {ref} from "vue";
import {use_repositories_store} from "@/store/repositories";
import RepositoriesDrawerAddRepository
  from "@/components/repositories/RepositoriesDrawerAddRepository.vue";

const show_search = ref(null)

const repository_store = use_repositories_store()
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>

        <v-row no-gutters>

          <v-label text="Repositories"/>

          <v-spacer/>

<!--          <v-btn icon="mdi-table-search" @click="show_search = !show_search" flat/>-->

          <repositories-drawer-add-repository/>
        </v-row>

      </v-list-item>

      <v-divider/>

      <v-list-item v-for="repository in  repository_store.repositories.repositories"
                   :key="repository.name"
                   :value="repository.name"
                   @click="repository_store.current_open_repository = repository">

        <template #title>

          <span class="ml-2 mb-5">
            {{ repository.name }}
          </span>

        </template>

        <template #prepend>

          <v-chip class="mt-1"
                  color="pink"
                  label size="x-small">
            type: {{ repository.type }}
          </v-chip>

        </template>

      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
