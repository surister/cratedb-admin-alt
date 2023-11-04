<script setup>

import {color_objects, is_object} from "@/store/utils";
import DialogText from "@/components/shared/text/DialogText.vue";
import {ref} from "vue";


const props = defineProps(
    {
      headers: Array[Object],
      items: Array[Object],
    }
)

let search = ref('')
</script>

<template>
  <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      placeholder="Filter column.."
      single-line
      hide-details
  ></v-text-field>
  <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td v-for="it, index in item" :key="index">
          <template v-if="is_object(it) || Array.isArray(it)">
            <dialog-text :object="it"></dialog-text>
          </template>
          <template v-else>
            <span :style="{color: color_objects(it)}">{{ it }}</span>
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
