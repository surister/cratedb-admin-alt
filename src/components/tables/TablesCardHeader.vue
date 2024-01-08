<script setup>
import TablesColumnText from "@/components/tables/TablesCardHeaderColumnText.vue";
import {use_tables_store} from "@/store/tables";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";
import {human_file_size} from "@/store/utils";
import {computed} from "vue";

const tables_info = use_tables_store()

// Abstract status_color, it is also needed in TablesDrawerSuspensedContent.vue
function status_color(table) {
  if (!table.overall_health) {
    return ''
  }
  return CRATE_HEALTH_LEGEND[table.overall_health].color
}

function short_description(table) {
  let key = 'UNKNOWN'
  if (table.overall_health) {
    key = table.overall_health
  }
  return CRATE_HEALTH_LEGEND[key].short_description
}

const is_system_table = computed(() => tables_info.current_open_schema.is_system)

</script>

<template>

  <v-row align-content="center">

    <v-col align-self="center">
      <span class="font-weight-bold text-h4 mt-5">
            <span class="text-blue-accent-1">{{
                tables_info.current_open_table.schema
              }}</span>.{{ tables_info.current_open_table.name }}
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

      <v-chip class="mt-2 ml-2"
              v-if="!is_system_table && !tables_info.current_open_table.is_view()"
              label>

        <span v-if="tables_info.current_open_table.version">created: {{
            tables_info.current_open_table.version.created
          }} - upgraded: {{
            tables_info.current_open_table.upgraded ? tables_info.current_open_table.version : false
          }}</span>
      </v-chip>
      <v-chip class="mt-2 ml-2"
              v-if="!is_system_table && !tables_info.current_open_table.is_view()"
              label>
        Clustered by: {{ tables_info.current_open_table.clustered_by }}
      </v-chip>

    </v-col>
    <v-spacer/>

  </v-row>

  <v-row class="pt-1">
    <tables-column-text title="Records"
                        :value="tables_info.current_open_table.total_records"/>

    <tables-column-text title="Shards"
                        :value="tables_info.current_open_table.shard_count()"/>

    <tables-column-text title="Replicas"
                        :value="tables_info.current_open_table.replicas"/>

    <tables-column-text title="Total size"
                        :value="human_file_size(tables_info.current_open_table.total_size_bytes)"/>

    <tables-column-text title="Under-replicated shards"
                        :value="tables_info.current_open_table.total_underreplicated_shards"
                        :color="tables_info.current_open_table.total_underreplicated_shards > 0 ? 'red': ''"/>

    <tables-column-text title="Missing shards"
                        :value="tables_info.current_open_table.total_missing_shards"
                        :color="tables_info.current_open_table.total_missing_shards > 0 ? 'red': ''"/>
  </v-row>
</template>

<style scoped>

</style>
