<script setup>
import {computed, ref} from "vue";
import {useConsoleStore} from "@/store/consoleStore";

const button = ref()

const selectedItems = ref('')

const consoleStore = useConsoleStore()

const items = [
  {value: 'Not watch'},
  {value: 1},
  {value: 2}
]

</script>

<template>
  <v-btn class="ml-2" size="x-large" @click="consoleStore.watch_query = !consoleStore.watch_query">
    <template #default>
      <v-switch v-model="consoleStore.watch_query" color="primary">
        <template v-slot:label>
          <h4>Watch query</h4>
        </template>
      </v-switch>
    </template>
  </v-btn>
  <v-btn class="ml-1" icon="mdi-information" variant="text"></v-btn>
  <v-btn size="x-large" class="ml-2" ref="button" v-show="false">
    Watch query every {{ selectedItems.value }}s
    <template #prepend>
      <v-icon>mdi-pencil</v-icon>
    </template>
  </v-btn>
  <v-select
    :menu-props="{
    activator: button,
    openOnClick: true,
  }"
    v-model="selectedItems"
    label="User"
    :items="items"
    hide-details
    return-object
    v-show="false">
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="`${item.value} Seconds`"></v-list-item>
    </template>
  </v-select>


</template>

<style scoped>

</style>
