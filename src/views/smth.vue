<script setup>
import {computed, ref} from "vue";

const dialog = ref(false)
let filters = ref({'name': [], 'calories': [], 'status': []})
let activeFilters = ref({})
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    status: 'DIET'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    status: 'NO DIET'
  },
]

const headers = computed(() => [
  {
    text: 'Dessert (100g serving)',
    align: 'start',
    sortable: true,
    value: 'name',
    filter: value => {
      return activeFilters.value.name ? activeFilters.value.name.includes(value) : true;
    }
  },
  {
    text: 'Calories', value: 'calories',
    filter: value => {
      return activeFilters.value.calories ? activeFilters.value.calories.includes(value) : true;
    }
  },
  {
    text: 'Status', value: 'status',
    filter: value => {
      return activeFilters.value.status ? activeFilters.value.status.includes(value) : true;
    }
  },
  {text: 'Fat (g)', value: 'fat'},
  {text: 'Carbs (g)', value: 'carbs'},
  {text: 'Protein (g)', value: 'protein'},
  {text: 'Actions', value: 'actions', sortable: false},
])

</script>

<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" item-key="name" show-select>
    <template v-for="(col, i) in filters" v-slot:[`header.${i}`]="{ header }">
      <div style="display: inline-block; padding: 16px 0;">{{ header.text }}</div>
      <div style="float: right; margin-top: 8px">
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y
                transition="slide-y-transition" left fixed style="position: absolute; right: 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" icon v-bind="attrs" v-on="on">
              <v-icon small
                      :color="activeFilters[header.value] && activeFilters[header.value].length < filters[header.value].length ? 'red' : 'default'">
                mdi-filter-variant
              </v-icon>
            </v-btn>
          </template>
          <v-list flat dense class="pa-0">
            <v-list-item-group multiple v-model="activeFilters[header.value]" class="py-2">
              <template v-for="(item, i) in filters[header.value]" :key="`${item}`">
                <v-list-item :value="item" :ripple="false">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" :true-value="item"
                                  @click="toggle" color="primary" :ripple="false"
                                  dense></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="6">
                <v-btn text block @click="toggleAll(header.value)" color="success">Toggle all
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn text block @click="clearAll(header.value)" color="warning">Clear all</v-btn>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </div>
    </template>
    <template v-slot:header="{ props: { headers } }">
      <thead>
      <tr>
        <th :colspan="headers.length">
          This is a header
        </th>
      </tr>
      </thead>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">adsf</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
