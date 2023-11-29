<script setup>
import {use_repositories_store} from "@/store/repositories";

import RepositoriesCardActions from "@/components/repositories/RepositoriesCardActions.vue";
import RepositoriesCardSnapshots from "@/components/repositories/RepositoriesCardSnapshots.vue";

const repository_store = use_repositories_store()
</script>

<template>
  <v-card v-if="repository_store.current_open_repository">
    <v-card-title>{{ repository_store.current_open_repository.name }}</v-card-title>
    <v-card-subtitle>
      <v-chip label>{{ repository_store.current_open_repository.settings.location }}</v-chip>
      <v-chip label class="mx-2">{{ repository_store.current_open_repository.type }}</v-chip>
    </v-card-subtitle>

    <v-divider class="mt-5"></v-divider>
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
