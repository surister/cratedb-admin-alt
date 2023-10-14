<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()
let dialog = ref(false)
const historyHeader = [
  {title: 'Query', align: 'start', key: 'query'}, {title: 'Actions', key: 'actions'}
]
</script>

<template>
  <v-card>
    <v-data-table
      items-per-page="5"
      item-key="query"
      :headers="historyHeader"
      :items="storedPreferences.console.queryHistory">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Query history</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip location="bottom" text="Delete query history">
            <template v-slot:activator="{ props }">
              <v-btn @click="dialog = true" v-bind="props" icon="mdi-delete-sweep"/>
            </template>
          </v-tooltip>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <p>Are you sure you want to delete the entire query history?</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  variant="text"
                  @click="storedPreferences.resetHistoryState(); dialog = false"
                >
                  Delete
                </v-btn>
                <v-btn
                  variant="text"
                  @click="dialog = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td v-ripple
              @click="consoleStore.content = item.query"
              class="spec text-truncate text-no-wrap"
              style="max-width: 15vw; min-width: 15vw">
            <v-tooltip :text="item.query">
              <template v-slot:activator="{ props }">
                <span v-bind="props">
                  {{ item.query }}
                </span>
              </template>
            </v-tooltip>
          </td>
          <td>
            <v-btn flat icon="mdi-delete" size="small"
                   @click="storedPreferences.deleteHistory(item)"></v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
.spec:hover {
  background-color: rgba(56, 67, 73, 0.1) !important;
  cursor: pointer;
}
</style>
