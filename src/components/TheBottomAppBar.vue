<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {use_global_store} from "@/store/global_store";

const stored_preferences_store = use_stored_preferences_store()
const global_store = use_global_store()

const commit_hash = import.meta.env.VITE_COMMIT_HASH.substring(0, 7)
const commit_url = `https://github.com/surister/cratedb-admin-alt/commit/${commit_hash}`
</script>

<template>
  <v-app-bar location="bottom"
             class="v-border-t"
             density="compact"
             elevation="0"
             height="60">

    <v-container fluid>

      <v-row>

        <v-col>
          <v-btn size="small"
                 append-icon="mdi-star"
                 text="If you like my work consider giving a star"
                 href="https://github.com/surister/cratedb-admin-alt"
                 target="_blank">
            <template #append>
               <v-icon color="yellow">mdi-star</v-icon>
            </template>
          </v-btn>
        </v-col>

        <v-spacer/>

        <v-col>

          <v-row no-gutters>

            <v-col class="text-right">

              <v-chip label size="small" class="mr-2">
                <v-progress-circular model-value="100"
                                     size="10"
                                     width="5"
                                     :color="global_store.network_connection_attempts > 0 ? 'red' : 'green'"/>
                <span class="mx-2">
                  <template v-if="global_store.network_connection_attempts > 0">
                    Error
                  </template>
                  <template v-else>
                    Connected
                  </template>
                </span>
                {{ stored_preferences_store.general.master_node_url }}
              </v-chip>

              <v-btn prepend-icon="mdi-github" size="small"
                     :href="commit_url"
                     target="_blank">#{{ commit_hash.substring(0, 7) }}
              </v-btn>
            </v-col>

          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
