<script setup>
import {ref} from "vue";
import {download} from "@/store/utils";
import {use_console_store} from "@/store/console_store";

const button = ref()

const selectedItems = ref('')
const items = [
  // {title: 'CSV', format: 'csv'},
  {title: 'JSON', format: 'json'},
]
const console_store = use_console_store()
</script>

<template>
<span v-show="false">
  <v-btn size="x-large"
         class="ml-2"
         ref="button">
  </v-btn>
  <v-select :menu-props="{
      activator: button,
      openOnClick: true,
  }"
            v-model="selectedItems"
            label="User"
            :items="items"
            hide-details
            return-object>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="`${item.value} Seconds`"></v-list-item>
    </template>
  </v-select>
</span>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"
             icon="mdi-download"/>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items"
                   :key="index"
                   :value="index"
                   :prepend-icon="item.icon"
                   @click="download(console_store.current_console.response.data.rows, item.format)">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>
