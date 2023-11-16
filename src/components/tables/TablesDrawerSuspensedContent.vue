<script setup>
import {human_file_size, human_numbers} from "@/store/utils";

import {use_tables_store} from "@/store/tables";
import {computed, ref} from "vue";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";

const tables_info = use_tables_store()
await tables_info.update_tables() // This is allowed, it converts the whole component into a Suspensable.

const filter = ref(null)
const filtered_tables = (tables) => tables.filter((table) => {
  if (filter.value == null || !props.showSearch) {
    return !table.is_view()
  }
  const regex = `^.*${filter.value}`
  const match = table.name.match(regex)
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

function status_color(table){
  if (table.health == null){
    return ''
  }
  return CRATE_HEALTH_LEGEND[table.health].color
}

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
                :key="schema.name"
                :value="schema.name">
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

    <v-list-group fluid :value="schema.name + '.' + 'views'">
      <template v-slot:activator=" { props }">
        <v-list-item v-bind="props" title="Views" density="compact" color="yellow"/>
      </template>
      <v-list-item :value="schema.name + table.name"
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
    <v-list-group fluid :value="schema.name + '.' + 'tables'">
      <template v-slot:activator=" { props }">
        <v-list-item density="compact" v-bind="props" title="Tables" color="primary"/>
      </template>
      <v-list-item :value="schema.name + table.name"
                   :key="schema.name + table.name"
                   v-for="(table, i) in filtered_tables(schema.tables)"
                   @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">
        <template #title>
          <span class="font-weight-bold">{{ table.name }}</span>
        </template>
        <template #append v-if="!schema.is_system">
          <span class="mr-2">
            <template v-if="table != null">
                 <v-progress-circular model-value="100"
                                      size="10"
                                      width="5"
                                      :color="status_color(table)"/>
            </template>

          </span>
        </template>
        <template #subtitle>
          {{ table.records == null ? 'n/a' : human_numbers(table.records) }} records - Size
          {{ table.size_bytes != null ? human_file_size(table.size_bytes) : 'n/a' }}
        </template>
      </v-list-item>
    </v-list-group>
    <v-divider/>
  </v-list-group>
</template>

<style scoped>

</style>
