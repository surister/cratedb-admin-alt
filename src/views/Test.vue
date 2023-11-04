<script setup>

import {computed, reactive} from "vue";
import CollapsibleText from "@/components/shared/object_representation/CollapsibleText.vue";
import BetterCollapsibleText
  from "@/components/shared/object_representation/BetterCollapsibleText.vue";

import { JsonTreeView } from "json-tree-view-vue3";


const headers =  [
          {
            title: 'Dessert (100g serving)',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
        ]
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
    {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    status: 'NO DIET'
  },
]

let active_filters = reactive({})

function add_or_remove_filter(key, element) {
  // If the element does not exist on the key, it will add it, otherwise it will remove it.
  let l = active_filters[key]
  if (l != null) {
    if (l.includes(element)) {
      const index = l.indexOf(element)
      l.splice(index, 1)
    } else {
      l.push(element)
    }
  } else {
    active_filters[key] = [element,]
  }
}
function is_filtered(key, element) {
  const l = active_filters[key]
  if (l != null) {
    return active_filters[key].includes(element)
  }
  return false
}

let data = computed(() => {
  return desserts.filter((el)=>{
    for (const key of Object.keys(active_filters)) {
      if (active_filters[key] != null){
        if (is_filtered(key, el[key])) {
          return false
        }
      }
    }
    return true
  })
})

const obj = {
  "files": {
    "recovered": 0,
    "used": 1,
    "percent": 100,
    "reused": 1
  },
  "stage": "DONE",
  "type": "EXISTING_STORE",
  "total_time": 40,
  "size": {
    "recovered": 0,
    "used": 208,
    "percent": 100,
    "reused": 208
  }
}

const other_obj = { "name": "cratedb02", "id": "72tKTcieRuGb2pGKo542Fg" }


</script>

<template>
  {{ active_filters }}
  <v-data-table
    :headers="headers"
    :items="data"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <td>
            <span class="mr-2 cursor-pointer">{{ column.title }}</span>
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-filter-variant" flat size="x-small" v-bind="props"></v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in desserts"
                  :key="i"
                >
                  <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                      <v-checkbox-btn :model-value="!is_filtered(column.key, item[column.key])"
                                      @click="add_or_remove_filter(column.key, item[column.key])"></v-checkbox-btn>
                    </v-list-item-action>
                  </template>
                  <v-list-item-title>{{ item[column.key] }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </template>
      </tr>
    </template>
  </v-data-table>

  <v-row no-gutters>
    <v-col cols="1" class="" style="max-width: 1vh;">fsdf</v-col>
    <v-col>
      <details>
        <details class="ml-4">
          <p class="ml-4">Sex</p>
        </details>
      </details>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  Hello
  <br>
  <h1>sa</h1>
  <collapsible-text :object="obj"></collapsible-text>
  <better-collapsible-text :object="obj"></better-collapsible-text>
  <json-tree-view :data="JSON.stringify( other_obj)"></json-tree-view>

</template>




<style scoped>

</style>
