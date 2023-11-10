<script setup>
import {human_file_size, human_numbers} from "@/store/utils";

import {use_tables_store} from "@/store/tables";
import {ref} from "vue";

const tables_info = use_tables_store()
await tables_info.update_tables() // This is allowed, it converts the whole component into a Suspensable.

const filter = ref(null)
const filtered_tables = (tables) => tables.filter((table) => {
  if (filter.value == null || !props.showSearch) {
    return !table.is_view()
  }
  const regex = `^.*${filter.value}`
  const match = table.name.match(regex)
  console.log(table)
  return match != null && !table.is_view()
})

const filtered_views = (tables) => tables.filter((table) => {
  if (filter.value == null || !props.showSearch) {
    return table.is_view()
  }
  const regex = `^.*${filter.value}`
  const match = table.name.match(regex)
  return match != null && table.is_view()
})

const props = defineProps({
  showSearch: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-expand-transition>
    <v-text-field v-model="filter"
                  clearable
                  variant="solo-filled"
                  placeholder="Search table.."
                  :focused="true"
                  class="rounded-0"
                  v-if="showSearch"/>
  </v-expand-transition>

  <v-list-group fluid
                v-for="schema in tables_info.schemas.schemas"
                color="primary"
                :key="schema">
    <v-divider/>
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props"
                   :title="schema.name">
        <template #subtitle>
          {{ schema.tables.length }} tables <span v-if="!schema.is_system"> - Size: {{
            human_file_size(schema.get_size_bytes())
          }}</span>
        </template>
      </v-list-item>
    </template>

    <v-list-group fluid>
      <template v-slot:activator=" { props }">
        <v-list-item v-bind="props" title="Views" density="compact" color="yellow"/>
      </template>
      <v-list-item :value="schema.name + i"
                   :key="schema.name + i"
                   v-for="(table, i) in filtered_views(schema.tables)"
                   @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">
        <template #title>
          <span class="font-weight-bold">{{ table.name }}</span>

        </template>
        <template #subtitle>
          {{ table.records == null ? 'n/a' : human_numbers(table.records) }} records - Size
          {{ table.size_bytes != null ? human_file_size(table.size_bytes) : 'n/a' }}
        </template>
      </v-list-item>
    </v-list-group>
    <v-list-group fluid>
      <template v-slot:activator=" { props }">
        <v-list-item density="compact" v-bind="props" title="Tables" color="primary"/>
      </template>
      <v-list-item :value="schema.name + i"
                   :key="schema.name + i"
                   v-for="(table, i) in filtered_tables(schema.tables)"
                   @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">
        <template #title>
          <span class="font-weight-bold">{{ table.name }}</span>
        </template>
        <template #subtitle>
          {{ table.records == null ? 'n/a' : human_numbers(table.records) }} records - Size
          {{ table.size_bytes != null ? human_file_size(table.size_bytes) : 'n/a' }}
        </template>
      </v-list-item>
    </v-list-group>

    <v-divider></v-divider>

  </v-list-group>

</template>

<style scoped>

</style>
