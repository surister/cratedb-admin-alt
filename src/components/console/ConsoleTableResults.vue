<script setup>
import {use_console_store} from "@/store/console_store";
import {adaptVTableItems, is_object} from "@/store/utils";
import {JsonTreeView} from "json-tree-view-vue3";
import ConsoleTableResultsToolbarActions
  from "@/components/console/ConsoleTableResultsToolbarActions.vue";
import DialogText from "@/components/shared/text/DialogText.vue";
import {ref} from "vue";
import VerticalDivider from "@/components/shared/VerticalDivider.vue";
import {CRATE_TYPES, get_type_name} from "@/store/crate_api/crate_lang";

const console_store = use_console_store()

const props = defineProps({
  data: {
    type: Object
  },
  extra_title:{
    type: String,
    default: ''
  }
})

function apply_color_class(object) {
  switch (typeof object) {
    case "string":
      return "crate-datatype-string"
    case "number":
      return 'crate-datatype-number'
    case "boolean":
      return 'crate-datatype-boolean'
    default:
      return 'noclass'
  }
}

const is_clicked = ref()
const is_collapsed = ref(false)
const show_types = ref(true)

function map_headers_with_types(headers, header_types) {
  if (!show_types.value){
    return headers
  }
  //  An example of data is:
  //  { "rows": [ [ "23", 2 ] ], "headers": [ "col1", "col2" ], "row_count": 1, "header_types": [ 4, 9 ] }
  // we map header_types with headers, to get "headers": [ "col1 - String", "col2 - Integer" ]

  // We assume that the position matches, this is how it works in crate, if this changes this will
  // break.
  return headers.map((curr_el, index) =>{
     const types = header_types[index]

      if (Array.isArray(types)){
        return `${curr_el} ${get_type_name(types[0])}[${get_type_name(types[1])}]`
      }

     return `${curr_el} (${get_type_name(header_types[index])})`
  })
}
</script>

<template>
  <v-card v-if="data.rows && data.rows.length !== 0 && data.rows[0].length !== 0"
          elevation="0">

    <v-toolbar flat :class="[is_collapsed ? 'border-b-0' : 'border-b-sm', 'bg-surface']">

      <v-toolbar-title>Showing: {{ data.headers.length }} columns and {{ data.rows.length }}
        record(s)
        <v-label class="mx-2" v-if="extra_title">{{ extra_title }}</v-label>
        <vertical-divider/>

        <v-btn @click="is_collapsed = !is_collapsed"
               :text="is_collapsed ? 'expand' : 'collapse'"
               size="small"
               class="ml-1"
               variant="text"/>
      </v-toolbar-title>
      <!--      TODO: Put into toolbar-actions -->
      <v-switch hide-details
                v-model="show_types"
                color="primary"
                label="Show types"
                class="mr-5"
      />
      <console-table-results-toolbar-actions/>

    </v-toolbar>
    <v-expand-transition>

      <v-data-table :items="adaptVTableItems(data.rows, map_headers_with_types(data.headers, data.header_types))"
                    :items-per-page="!console_store.show_full_screen_response ? 5: 10"
                    class="tabular"
                    v-if="!is_collapsed">

        <template v-slot:headers="{ columns }">
          <tr>

            <th :key=column.key v-for="column in columns">{{ column.value }}</th>
          </tr>
        </template>

        <template v-slot:item="{ item, index }">
          <tr>
            <td v-for="(data, column_name) in item"
                :key="index + column_name"
                @click="is_clicked = index + column_name"
                :class="[is_clicked === index + column_name ? 'is_clicked': '']">

              <template v-if="is_object(data) || Array.isArray(data)">
                <component
                  :is="console_store.object_representation_mode ? JsonTreeView : DialogText"
                  class="my-1"
                  colorScheme="dark"
                  rootKey="Object"
                  :maxDepth="0"
                  :data="JSON.stringify(data)"
                  :length="Object.entries(data).length"/>
              </template>

              <template v-else>
                <span :class="apply_color_class(data)">{{ data }} </span>
              </template>
            </td>
          </tr>
        </template>

      </v-data-table>
    </v-expand-transition>

  </v-card>
</template>

<style>
.tabular .v-data-table-footer {
  border-top: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px !important;
}

.v-theme--dark .data-key {
  color:red !important;
}

.v-theme--light .data-key {
    color: black !important;
}

.v-theme--light .data-key:hover {
    background-color: rgba(115, 109, 109, 0.1) !important;
}

.v-theme--light .value-key {
    color: black !important;
}
</style>

<style scoped>
.tabular td, th {
  border-inline-end-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-inline-end-style: solid;
  border-inline-end-width: 1px;
}

.is_clicked {
  outline: cornflowerblue solid 1px !important;
}

.tabular td:hover {
  outline: cornflowerblue solid 1px !important;
}

.v-theme--dark .crate-datatype-string {
  color: #6A8759
}

.v-theme--light .crate-datatype-string {
  color: #2c5705
}

.v-theme--dark .crate-datatype-number {
  color: #6897BB
}

.v-theme--light .crate-datatype-number{
  color: #016cbd;
}

.v-theme--dark .crate-datatype-boolean {
  color: #CC7832
}

.v-theme--light .crate-datatype-boolean {
  color: #ff7600
}

</style>
