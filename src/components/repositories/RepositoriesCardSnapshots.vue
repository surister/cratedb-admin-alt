<script setup>

import {use_repositories_store} from "@/store/repositories";

const repository_store = use_repositories_store()
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(snapshot, i) in repository_store.current_open_repository.snapshots"
                       :key="i"
                       :title="snapshot.state">

      <template #title>
        <v-chip class="mr-2" size="small"
                :color="snapshot.state === 'SUCCESS' ? 'success': 'error'">{{ snapshot.state }}
        </v-chip>
        <v-toolbar-title>{{ snapshot.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip>{{ snapshot.version }}</v-chip>
      </template>

      <template #text>
        <v-card variant="plain">

          <v-card-title>Finished: {{ new Date(snapshot.finished).toLocaleString() }}. It took

            {{ new Date(snapshot.finished - snapshot.started).getHours() - 1 }}h
            {{ new Date(snapshot.finished - snapshot.started).getMinutes() }}m
            {{ new Date(snapshot.finished - snapshot.started).getSeconds() }}s

          </v-card-title>

          <v-card-text>

            <details>
              <summary> Tables ({{ snapshot.concrete_indices.length }})</summary>
              <pre>{{ snapshot.tables }}</pre>
            </details>

            <details>
              <summary> Concrete indices ({{ snapshot.concrete_indices.length }})</summary>
              <pre>{{ snapshot.concrete_indices }}</pre>
            </details>

            <details>
              <summary> Failures ({{ snapshot.failures.length }})</summary>
              <pre>{{ snapshot.failures }}</pre>
            </details>

            <details>
              <summary> Table partitions ({{ snapshot.table_partitions.length }})</summary>
              <pre>{{ snapshot.table_partitions }}</pre>
            </details>

          </v-card-text>
        </v-card>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>

</style>
