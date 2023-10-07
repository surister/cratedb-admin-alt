<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()
const historyHeader = [
    {title: 'Query history', align: 'start', key:'query'}, {key:'actions'}
]
</script>

<template>
  <v-card>
    <v-data-table
        items-per-page="5"
        item-key="query"
        :headers="historyHeader"
        :items="storedPreferences.console.queryHistory">
      <template v-slot:item="{ item }">
        <tr>
          <td v-ripple
              @click="consoleStore.content = item.query"
              class="spec text-truncate text-no-wrap"
              style="max-width: 15vw; min-width: 15vw">
            {{ item.query }}
          </td>
          <td>
            <v-btn flat icon="mdi-delete" size="small" @click="storedPreferences.deleteHistory(item)"></v-btn>
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
