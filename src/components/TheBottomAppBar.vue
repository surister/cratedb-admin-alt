<script setup>
import {use_stored_preferences_store} from "@/store/storedPreferences";

const stored_preferences_store = use_stored_preferences_store()
</script>

<template>
  <v-app-bar location="bottom"
             class="v-border-t"
             density="compact"
             height="60">

    <v-container fluid>

      <v-row>

        <v-col>
          <v-label>
            If you like it give us a
            <v-icon size="x-small" color="yellow" class="ml-1">mdi-star</v-icon>
          </v-label>
        </v-col>

        <v-spacer/>

        <v-col>

          <v-row no-gutters>

            <v-spacer/>

            <v-col class="text-right">
              <v-chip label>
                <v-progress-circular model-value="100"
                                     size="10"
                                     width="5"
                                     color="green"/>
                <span class="mx-2">Connected</span>
                {{ stored_preferences_store.general.master_node_url }}
              </v-chip>
            </v-col>

            <v-col class="text-center" cols="1">
              <v-icon class="ml-2">mdi-github</v-icon>
            </v-col>

          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
