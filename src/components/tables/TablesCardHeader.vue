<script setup>
import TablesColumnText from "@/components/tables/TablesCardHeaderColumnText.vue";
import {use_tables_store} from "@/store/tables";
import {human_file_size} from "@/store/utils";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";

const tables_info = use_tables_store()

// Abstract status_color, it is also needed in TablesDrawerSuspensedContent.vue
function status_color(table){
  if (!table.health){
    return ''
  }
  return CRATE_HEALTH_LEGEND[table.health].color
}

function short_description(table){
  let key = 'UNKNOWN'
  if (table.health){
    key = table.health
  }
    return CRATE_HEALTH_LEGEND[key].short_description
}

</script>

<template>

  <v-row align-content="center">
    <v-col align-self="center">
      <span class="font-weight-bold text-h4 mt-5">
            <span class="text-blue-accent-1">{{ tables_info.current_open_table.schema }}</span>.{{ tables_info.current_open_table.name }}
      </span>
      <br>
      <v-chip class="mt-2"
              label
              :color="status_color(tables_info.current_open_table)"
              :text="short_description(tables_info.current_open_table)"/>
      <v-chip class="mt-2 ml-2"
              label
              :color="tables_info.current_open_table.is_view() ? 'yellow': 'info'"
              :text="tables_info.current_open_table.is_view() ? 'view': 'table'"/>
    </v-col>
    <v-spacer/>

  </v-row>

  <v-row class="pt-1">
    <tables-column-text title="Records"
                        :value="tables_info.current_open_table.records"/>
    <tables-column-text title="Shards"
                        :value="tables_info.current_open_table.shards"/>
    <tables-column-text title="Replicas"
                        :value="tables_info.current_open_table.replicas"/>
    <tables-column-text title="Total size"
                        :value="human_file_size(tables_info.current_open_table.size_bytes)"/>
    <tables-column-text title="Total size"
                        :value="human_file_size(tables_info.current_open_table.size_bytes)"/>
    <tables-column-text title="Under-replicated shards"
                        :value="tables_info.current_open_table.underreplicated_shards"/>
    <tables-column-text title="Missing shards"
                        :value="tables_info.current_open_table.missing_shards"/>
  </v-row>

</template>

<style scoped>

</style>
