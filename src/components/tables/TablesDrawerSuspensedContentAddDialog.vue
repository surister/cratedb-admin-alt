<script setup>
import {computed, ref} from "vue";
import {format_sql} from "@/store/utils";
import {use_tables_store} from "@/store/tables";

const table_store = use_tables_store()

const GROUPS = {
  NAME: 0,
  COLUMNS: 1,
}
const current_group = ref(null)
const current_column = ref(null)
const columns = ref([])

const table_options = ref({
  name: 'table',
  columns: columns,
  if_not_exists: true
})

function change_context_group(group) {
  if (group === GROUPS.NAME) {
    current_column.value = null
  }
  current_group.value = group
}

function init_column() {
  let new_id = 0

  if (columns.value.length > 0) {
    new_id = columns.value[columns.value.length - 1].id + 1
  }

  columns.value.push(
    {id: new_id, name: 'new_column'}
  )
}

function add_new_element() {
  if (current_group.value === GROUPS.COLUMNS) {
    init_column()
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
    let comma_after_col = column.id === table_options.value.columns.length - 1 ? '' : ','

    let _stmt = `${column.name} ${column.type}`

    if(column.default != null){
      _stmt += ` DEFAULT '${column.default}'`
    }

    if (column.nullable){
      _stmt += ' NOT NULL'
    }

    _stmt += comma_after_col

    stmt_columns += _stmt
  }
  stmt_columns += ')'

  return format_sql(stmt_create + stmt_columns)
})

const data_types = [
  'BOOLEAN',
  'TEXT',
  'SMALLINT',
  'INTEGER',
  'BIGINT',
  'REAL',
  'DOUBLE PRECISION',
  'NUMERIC',
  'TIMESTAMP WITH TIME ZONE',
  'TIMESTAMP WITHOUT TIME ZONE',
  'DATE',
  'TIME',
  'IP',
  'OBJECT',
  'ARRAY',
  'GEO_POINT',
  'GEO_SHAPE'
]

</script>

<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-table-plus" flat/>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Create table: <span
            class="text-h5 font-weight-bold">{{ table_options.name }}</span>
          </v-toolbar-title>
        </v-toolbar>
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
                           :disabled="!(current_group !== GROUPS.NAME)"/>
                    <v-btn icon="mdi-minus"
                           @click="remove_element"
                           :active="false"
                           :disabled="!(current_column != null)"/>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-list>
                    <v-list-item prepend-icon="mdi-table"
                                 :active="current_group === GROUPS.NAME"
                                 title="Table name"
                                 active-color="blue"
                                 @click="change_context_group(GROUPS.NAME)"
                                 link/>
                    <v-list-group fluid>
                      <template v-slot:activator="{ props }">
                        <v-list-item
                          v-bind="props"
                          @click="change_context_group(GROUPS.COLUMNS)"
                          :active="current_group === GROUPS.COLUMNS"
                          active-color="blue"
                          title="Columns"
                          prepend-icon="mdi-table-column"
                          link/>
                      </template>

                      <v-list-item
                        @click="current_column = column; current_group = GROUPS.COLUMNS"
                        :active="current_column != null && current_column.id === column.id"
                        v-for="(column, i) in columns"
                        :key="i"
                        :value="i"
                        class="ml-6">
                        <template #prepend>
                          <v-chip variant="outlined"
                                  v-if="column.type"
                                  size="x-small"
                                  color="pink">
                            {{ column.type }}
                          </v-chip>
                        </template>
                        <template #title>
                          <span class="ml-2">
                            {{ column.name }}
                          </span>
                        </template>
                      </v-list-item>

                    </v-list-group>
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8">
              <template v-if="current_group === GROUPS.NAME">
                <v-label>Table options</v-label>
                <v-row align="end">
                  <v-col>
                    <v-text-field class="mt-6"
                                  density="compact"
                                  label="Schema"
                                  v-model="table_options.schema"/>
                  </v-col>
                  <v-col>
                    <v-text-field density="compact"
                                  label="Table name"
                                  v-model="table_options.name"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-checkbox-btn label="IF NOT EXISTS"
                                    density="compact"
                                    v-model="table_options.if_not_exists"></v-checkbox-btn>
                  </v-col>
                </v-row>
              </template>
              <template v-if="current_column != null">
                <v-label>Column options</v-label>
                <v-row align="end">
                  <v-col>
                    <v-text-field class="mt-6"
                                  density="compact"
                                  label="Name"
                                  v-model="current_column.name"/>
                  </v-col>
                  <v-col>
                    <v-select
                      density="compact"
                      label="Data type"
                      :items="data_types"
                      v-model="current_column.type"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>

                    <v-text-field density="compact"
                                  label="Default value"
                                  v-model="current_column.default"/>
                  </v-col>
                  <v-col>
                    <v-checkbox density="compact"
                                label="Nullable"
                                v-model="current_column.nullable"/>
                  </v-col>
                </v-row>
              </template>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-label>Preview</v-label>
          </v-row>
          <v-row>
            <v-divider/>
            <v-col>
              <v-code class="mt-6" tag="pre">{{ generate_sql }}</v-code>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn text="Create"
                 color="primary"
                 @click="table_store.create_table(generate_sql)"/>
          <v-btn
            text="Close"
            @click="isActive.value = false"/>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
