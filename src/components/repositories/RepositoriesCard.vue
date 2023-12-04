<script setup>
import RepositoriesCardActions from "@/components/repositories/RepositoriesCardActions.vue";
import RepositoriesCardSnapshots from "@/components/repositories/RepositoriesCardSnapshots.vue";

import {use_repositories_store} from "@/store/repositories";
const repository_store = use_repositories_store()
</script>

<template>
  <v-card v-if="repository_store.current_open_repository"
          border="sm"
          rounded="0">

    <v-card-title>{{ repository_store.current_open_repository.name }}</v-card-title>

    <v-card-subtitle>

      <v-chip label>{{ repository_store.current_open_repository.type }}</v-chip>

      <v-chip label
              class="mx-2"
              v-for="item in Object.entries(repository_store.current_open_repository.settings)"
              :key="item[0]">
        {{ item[0] }} : {{ item[1] }}
      </v-chip>

    </v-card-subtitle>

    <v-divider class="mt-5"/>

    <v-card-text>

      <v-row>

        <v-col>
          <repositories-card-actions/>
        </v-col>

      </v-row>

    </v-card-text>

    <v-divider/>

    <v-card-text>Snapshots</v-card-text>

    <repositories-card-snapshots/>

  </v-card>
</template>

<style scoped>

</style>
