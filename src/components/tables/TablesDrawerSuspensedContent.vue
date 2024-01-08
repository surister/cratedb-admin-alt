<script setup>
import {human_file_size, human_numbers} from "@/store/utils";

import {use_tables_store} from "@/store/tables";
import {ref} from "vue";

const tables_info = use_tables_store()

// This is allowed, it converts the whole component into a Suspensable.
// https://vuejs.org/guide/built-ins/suspense.html
await tables_info.update_tables()

const filter = ref(null)
const filtered_tables = (tables) => tables.filter((table) => {
  if (!filter.value || !props.showSearch) {
    // Disable filtering if there is no value in the filter text box, the text box is not being
    // shown and in this case, filter out views.
    return !table.is_view()
  }
  const regex = `^.*${filter.value}`
  const match = table.name.match(regex)
  return match && !table.is_view()
})

const filtered_views = (tables) => tables.filter((table) => {
  if (!filter.value || !props.showSearch) {
    return table.is_view()
  }
  const regex = `^.*${filter.value}`
  const match = table.name.match(regex)
  return match && table.is_view()
})

const props = defineProps({
  showSearch: {
    type: Boolean,
    default: false
  }
})

function status_color(table){
  if (!table.overall_health) {
    return ''
  }
  return table.overall_health
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
      <v-list-item v-bind="props">

        <template #title>
          <span class="font-weight-bold">{{ schema.name }}</span>
        </template>

        <template #subtitle>
          {{ schema.tables.length }} table(s) <span v-if="!schema.is_system"> - Size: {{
            human_file_size(schema.get_size_bytes())
          }}</span>
        </template>

      </v-list-item>
    </template>

    <!--  VIEWS SUBGROUP  -->
    <v-list-group fluid :value="schema.name + '.' + 'views'">

      <template v-slot:activator=" { props }">
        <v-list-item v-bind="props" title="Views" density="compact" color="yellow"/>
      </template>

      <v-list-item :value="schema.name + table.name"
                   :key="schema.name + table.name"
                   v-for="table in filtered_views(schema.tables)"
                   @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">

        <template #title>
          <span class="font-weight-bold">{{ table.name }}</span>
        </template>

        <template #subtitle>
          {{ table.total_records ? 'n/a' : human_numbers(table.total_records) }} records - Size
          {{ table.total_size_bytes ? human_file_size(table.total_size_bytes) : 'n/a' }}
        </template>

      </v-list-item>
    </v-list-group>

    <!--  TABLES SUBGROUP  -->
    <v-list-group fluid :value="schema.name + '.' + 'tables'">

      <template v-slot:activator=" { props }">
        <v-list-item density="compact" v-bind="props" title="Tables" color="primary"/>
      </template>

      <v-list-item :value="schema.name + table.name"
                   :key="schema.name + table.name"
                   v-for="table in filtered_tables(schema.tables)"
                   @click="tables_info.current_open_table = table; tables_info.current_open_schema = schema">

        <template #title>
          <v-icon icon="mdi-table" color="primary"/>
          <span class="font-weight-bold ml-2">{{ table.name }}</span>
        </template>

        <template #append v-if="!schema.is_system">
          <span class="mr-2">
            <template v-if="table">
                 <v-progress-circular model-value="100"
                                      size="10"
                                      width="5"
                                      :color="table.overall_health ? table.overall_health.toLowerCase() : ''"/>
            </template>

          </span>
        </template>

        <template #subtitle>
          <span class="text-subtitle-2">
            {{ table.total_records ? human_numbers(table.total_records) : 'n/a' }} records -
            {{ table.total_size_bytes ? human_file_size(table.total_size_bytes) : 'n/a' }}
          </span>
        </template>

      </v-list-item>

    </v-list-group>

    <v-divider/>

  </v-list-group>
</template>

<style scoped>

</style>
