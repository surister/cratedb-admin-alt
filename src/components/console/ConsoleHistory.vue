<script setup>
import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {ref} from "vue";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()

let dialog = ref(false)

const historyHeader = [
  {title: 'Query', align: 'start', key: 'query'},
  {title: 'Actions', key: 'actions', sortable: false}
]
const search = ref(false)
let search_text = ref('')
</script>

<template>
  <v-card>
    <v-data-table
        items-per-page="5"
        item-key="query"
        :headers="historyHeader"
        :items="stored_preferences.console.query_history"
        :search="search_text">
      <template v-slot:top>

        <v-toolbar flat>
          <v-toolbar-title>Query history</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-scale-transition>
            <v-text-field v-model="search_text"
                          variant="underlined"
                          v-if="search"
                          autofocus></v-text-field>
          </v-scale-transition>

          <v-btn flat
                 icon="mdi-text-box-search"
                 :color="search ? 'blue': ''"
                 @click="search = !search"/>

          <v-tooltip location="bottom" text="Delete query history">
            <template v-slot:activator="{ props }">
              <v-btn @click="dialog = true" v-bind="props" icon="mdi-delete-sweep"/>
            </template>
          </v-tooltip>

          <v-dialog v-model="dialog"
                    max-width="500px">

            <v-card>

              <v-card-text>
                <p>Are you sure you want to delete the entire query history?</p>
              </v-card-text>

              <v-card-actions>

                <v-spacer/>

                <v-btn color="red"
                       variant="text"
                       @click="stored_preferences.reset_query_history(); dialog = false">
                  Delete
                </v-btn>

                <v-btn variant="text"
                       @click="dialog = false"
                       text="cancel"/>

              </v-card-actions>

            </v-card>

          </v-dialog>
        </v-toolbar>

      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td v-ripple
              @click="console_store.current_console.content = item.query"
              class="spec text-truncate text-no-wrap"
              style="max-width: 17vw; min-width: 15vw">
            <v-tooltip :text="item.query">
              <template #default>
                <pre>{{ item.query }}</pre>
              </template>
              <template v-slot:activator="{ props }">
                <span v-bind="props">
                  {{ item.query }}
                </span>
              </template>
            </v-tooltip>
          </td>
          <td>
            <v-btn flat icon="mdi-delete"
                   size="small"
                   @click="stored_preferences.delete_from_history(item)"/>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
.spec:hover {
  background-color: rgba(56, 67, 73, 0.3) !important;
  cursor: pointer;
}
</style>
