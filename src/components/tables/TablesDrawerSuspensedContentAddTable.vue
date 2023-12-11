<script setup>
import {computed, ref} from "vue";
import {adaptVTableHeader, format_sql} from "@/store/utils";
import {use_tables_store} from "@/store/tables";
import {DATA_TYPES} from "@/store/crate_api/crate_lang";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const table_store = use_tables_store()

const GROUPS = {
  NAME: 0,
  COLUMNS: 1,
  CHECKS: 2,
  PARAMETERS: 3,
}
const current_group = ref(null)
const current_column = ref(null)
const current_check = ref(null)
const parameter_options = [
    'number_of_replicas',
    'number_of_routing_shards',
    'refresh_interval',
    'write.wait_for_active_shards',
    'blocks.read_only',
    'blocks.read_only_allow_delete',
    'blocks.read',
    'blocks.write',
    'blocks.metadata',
    'soft_deletes.enabled',
    'soft_deletes.retention.period',
    'codec',
    'store.type',
    'mapping.total_fields.limit',
    'translog.flush_threshold_size',
    'translog.sync_interval',
    'translog.durability',
    'routing.allocation.total_shards_per_node',
    'routing.allocation.enable',
    'allocation.max_entries',
    'unassigned.node_left.delayed_timeout',
    'column_policy',
    'max_ngram_diff',
    'max_shingle_diff',
    'merge.scheduler.max_tread_count'
]
const columns = ref([])

const table_options = ref({
  name: 'table',
  columns: columns,
  parameters: [],
  if_not_exists: false
})

function change_context_group(group) {
  current_group.value = group
}

function add_new_column() {
  let new_id = 0

  if (columns.value.length > 0) {
    new_id = columns.value[columns.value.length - 1].id + 1
  }

  columns.value.push(
      {id: new_id, name: 'new_column', checks: []}
  )
}

function add_new_check() {
  current_column.value.checks.push(
      {name: 'new_check'}
  )
}

function add_new_element() {
  if (current_group.value === GROUPS.COLUMNS) {
    add_new_column()
  }
}

function remove_element() {
  if (current_group.value === GROUPS.COLUMNS) {
    let id = columns.value.filter((column) => column.id === current_column.value.id)[0].id
    columns.value.splice(id, 1)
  }
}

const generate_sql = computed(() => {
    // We handcraft the SQL from the options that we get input, perhaps there is a library
    // that does it from its own API, and we just need to adapt our input to that API?
    // Is it even worth it to introduce a new dependency to avoid  5 lines of ifs?
    let stmt_create = "CREATE TABLE"

    if (table_options.value.if_not_exists) {
        stmt_create += ' IF NOT EXISTS'
    }

    let schema = table_options.value.schema ? `"${table_options.value.schema}".` : ''
    stmt_create += ` ${schema}"${table_options.value.name}"`

    let stmt_columns = '('

    for (const column of table_options.value.columns) {
      if (!column.type) {
        // Shortcircuit column stmt generation if column type has not been defined by the user
        continue
      }
      let comma_after_col = column.id === table_options.value.columns.length - 1 ? '' : ','

      let _stmt = `${column.name} ${column.type.name}`

      if (column.type.has_input) {
        _stmt += `(${column.input_value || column.type.default})`
      }

      if (column.default) {
        _stmt += ` DEFAULT '${column.default}'`
      }

      if (column.generated_expression){
        _stmt += ` GENERATED ALWAYS AS ${column.generated_expression}`
      }

      if (column.checks.length !== 0){
        // Supporting only 1 check for now, will prolly have to come back later at this.
        let check = column.checks[0]
        _stmt += check.name ? ` CONSTRAINT ${check.name}` : ''
        _stmt += ` CHECK` + `(${check.stmt})`
      }

      if (column.primary_key) {
        _stmt += ` PRIMARY KEY`
      }

      if (column.nullable) {
        _stmt += ' NOT NULL'
      }

      _stmt += comma_after_col

      stmt_columns += _stmt
    }

    stmt_columns += ')'

    let stmt_extras = ''

    if (table_options.value.shards){
      stmt_extras += `CLUSTERED INTO ${table_options.value.shards} SHARDS`
    }

    if (table_options.value.partitions){
      stmt_extras += ` PARTITIONED BY (${table_options.value.partitions})`
    }

    if (table_options.value.parameters.length !== 0){
      stmt_extras += ` WITH (`

      for (let i = 0; i < table_options.value.parameters.length; i++) {
        let parameter = table_options.value.parameters[i]

        let comma_after_col = i === (table_options.value.parameters.length - 1) ? '' : ','
        stmt_extras += `"${parameter.key}" = ${parameter.value}${comma_after_col}`

      }

      stmt_extras += ')'
    }

    return format_sql(stmt_create + stmt_columns + stmt_extras)
})

const data_types = DATA_TYPES

</script>

<template>
  <button-with-dialog tooltip-text="Create new table"
                      activator-btn-color=""
                      activator-btn-variant="text"
                      activator-btn-text=""
                      activator-btn-icon="mdi-table-plus"
                      dialog-width="1000"
                      dialog-submit-btn-color="primary"
                      dialog-submit-btn-text="create"
                      dialog-override-success-component-message="Table created successfully!"
                      :dialog-submit-btn-disabled="columns.length === 0"
                      :submit-callback="()=>table_store.create_table(generate_sql)">
    <template #dialog-title>
      <v-toolbar>
        <v-toolbar-title>Create table: <span
            class="text-h5 font-weight-bold">{{ table_options.name }}</span>
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template #dialog-content>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-btn-toggle density="comfortable"
                              divided
                              variant="outlined">
                  <v-btn icon="mdi-plus"
                         @click="add_new_element"
                         :active="false"
                         :disabled="current_group === GROUPS.NAME"/>
                  <v-btn icon="mdi-minus"
                         @click="remove_element"
                         :active="false"
                         :disabled="!current_column"/>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-list>
                  <v-list-item prepend-icon="mdi-table"
                               :active="current_group === GROUPS.NAME"
                               title="Table name"
                               color="blue"
                               @click="change_context_group(GROUPS.NAME)"
                               link/>
                  <v-list-group fluid>
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props"
                                   @click="change_context_group(GROUPS.COLUMNS)"
                                   :active="current_group === GROUPS.COLUMNS || current_group === GROUPS.CHECKS"
                                   color="blue"
                                   title="Columns"
                                   prepend-icon="mdi-table-column"
                                   link/>
                    </template>

                    <v-list-group v-for="(column, i) in columns" :key="i">
                      <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props"
                                     @click="current_column = column; current_group = GROUPS.COLUMNS"
                                     :active="current_column && current_column.id === column.id"
                                     :value="i">
                          <template #prepend>
                            <v-chip variant="outlined"
                                    v-if="column.type"
                                    size="x-small"
                                    color="pink">
                              {{ column.type.name }}
                            </v-chip>
                          </template>
                          <template #title>
                          <span class="ml-2">
                            {{ column.name }}
                          </span>
                          </template>
                        </v-list-item>
                      </template>
                      <v-list-group :value="'checks' + i">
                        <template v-slot:activator="{ props }">
                          <v-list-item v-bind="props">Checks</v-list-item>
                        </template>
                        <v-list-item v-for="(check, i) in column.checks"
                                     :key="i"
                                     @click="current_check = current_column.checks[i]; change_context_group(GROUPS.CHECKS)">
                          {{ check.name }}
                        </v-list-item>

                      </v-list-group>
                      <v-list-item @click="change_context_group(GROUPS.PARAMETERS)">Parameters</v-list-item>
                    </v-list-group>
                  </v-list-group>
                </v-list>
              </v-col>
            </v-row>
          </v-col>

          <!-- Form fields-->
          <v-col cols="8">
            <template v-if="current_group === GROUPS.NAME">
              <v-label>Table options</v-label>
              <v-row align="end">
                <v-col>
                  <v-text-field class="mt-6"
                                density="compact"
                                label="Schema"
                                v-model="table_options.schema"/>
                  <v-text-field density="compact"
                                label="Shards"
                                v-model="table_options.shards"/>
                </v-col>
                <v-col>
                  <v-text-field density="compact"
                                label="Table name"
                                v-model="table_options.name"/>
                  <v-text-field density="compact"
                                label="Partitions"
                                v-model="table_options.partitions"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-checkbox-btn label="IF NOT EXISTS"
                                  density="compact"
                                  v-model="table_options.if_not_exists"/>
                </v-col>
              </v-row>
            </template>
            <template v-if="current_column && current_group === GROUPS.COLUMNS">
              <v-label>Column options</v-label>
              <v-btn size="x-small"
                     flat class="mx-2"
                     color="primary"
                     @click="add_new_check">Add check
              </v-btn>
              <v-row>
                <v-col>
                  <v-text-field class="mt-6"
                                density="compact"
                                label="Name"
                                v-model="current_column.name"/>
                  <v-text-field density="compact"
                                clearable
                                label="Default value"
                                v-model="current_column.default"
                                :disabled="current_column.generated_expression"/>
                  <v-text-field density="compact" hide-details
                                label="Generated expression"
                                :disabled="current_column.default"
                                v-model="current_column.generated_expression"
                                clearable/>
                </v-col>
                <v-col>
                  <v-fade-transition class="mt-6">
                    <v-select density="compact"
                              label="Data type"
                              :items="data_types"
                              item-title="name"
                              item-value="name"
                              return-object
                              v-model="current_column.type">
                    </v-select>
                  </v-fade-transition>
                  <v-checkbox density="compact"
                              label="Primary key"
                              v-model="current_column.primary_key"/>
                  <v-checkbox density="compact"
                              label="Nullable"
                              v-model="current_column.nullable"/>
                </v-col>
              </v-row>


            </template>
            <template v-if="current_column && current_group === GROUPS.CHECKS">
              <v-label>Column check</v-label>
              <v-row class="">
                <v-col cols="4">
                  <v-text-field class="my-4"
                                label="Check name"
                                hide-details
                                hint="Check name"
                                v-model="current_check.name"
                                density="compact"
                                clearable/>
                </v-col>
                <v-col>
                  <v-text-field class="my-4"
                                label="Check statement"
                                hide-details
                                hint="Check statement"
                                v-model="current_check.stmt"
                                density="compact"
                                clearable/>
                </v-col>
              </v-row>
            </template>
            <template v-if="current_column && current_group === GROUPS.PARAMETERS">
              <v-label>Table parameters, check them &nbsp; <a target="_blank"
                                                              href="https://cratedb.com/docs/crate/reference/en/latest/sql/statements/create-table.html#with">here</a>
              </v-label>
              <br>
              <v-btn class="mt-2" icon="mdi-plus" variant="tonal"
                     @click="table_options.parameters.push({})"></v-btn>

              <v-data-table :headers="adaptVTableHeader(['key', 'value', 'delete'])" :items="[{key:'one', value:'s'}]">
                <template v-slot:headers="{ columns }">
                  <tr>
                    <th :key=column.key v-for="column in columns">{{ column.title }}</th>
                  </tr>
                </template>
                <template v-slot:item="{ item }">
                  <tr class="mt-3" v-for="(option, i) in table_options.parameters" :key="i">

                    <td class="pt-4" style="max-width: 150px">
                      <v-select :items="parameter_options" density="compact" v-model="option.key"/>
                    </td>
                    <td class="pt-4">
                      <v-text-field density="compact" v-model="option.value"/>
                    </td>
                    <td>
                      <v-btn icon="mdi-delete" variant="plain"
                             @click="table_options.parameters.splice(i, 1)"/>
                    </td>
                  </tr>
                </template>

              </v-data-table>

            </template>
          </v-col>
        </v-row>
        <!-- Preview -->
        <v-row class="mt-10">
          <v-label>Preview</v-label>
        </v-row>
        <v-row>
          <v-divider/>
          <v-col>
            <v-code class="mt-6 overflow-auto" tag="pre">{{ generate_sql }}</v-code>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </button-with-dialog>
</template>

<style scoped>
table.v-table tbody td {
    height: 40px;
    border: none;
}
.theme--light.v-table tbody tr:not(:last-child) {
    border-bottom: none;
}
</style>
