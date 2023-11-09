<script setup>
import {computed, ref} from "vue";
import {use_users_store} from "@/store/users";
import {use_tables_store} from "@/store/tables";

const permissions = ref({})

const user_store = use_users_store()
const table_store = use_tables_store()

const stmt_sql = computed(() => {
  let stmt = permissions.value.type || ''

  if (permissions.value.permission != null) {
    stmt += ` ${permissions.value.permission}\n`
  }

  if (permissions.value.on != null && permissions.value.on !== 'cluster') {
    stmt += ` ON ${permissions.value.on.toUpperCase()} "${permissions.value.schema}"${permissions.value.table != null ? '.' + `"${permissions.value.table}"` : ''}`
  }

  stmt += ' TO ' + user_store.current_open_user.name
  return stmt
})
const schema_list = computed(() => table_store.schemas.schemas.filter((schema) => !schema.is_system))

const tables_list = computed(() => {
  if (permissions.value.on === 'table' && permissions.value.schema != null)
    return table_store.schemas.schemas.filter((schema) => schema.name === permissions.value.schema)[0].tables.map((table) => table.name)
  return []
})

</script>

<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Add permissions" variant="text"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Add permissions</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-select v-model="permissions.permission"
                    label="Permission"
                    :items="['ALL', 'AL', 'DQL', 'DML', 'DDL']"/>
          <v-select v-model="permissions.on"
                    label="On"
                    :items="['cluster', 'schema', 'table', 'view']"/>
          <v-select label="Schema"
                    v-if="['schema', 'table', 'view'].includes(permissions.on)"
                    v-model="permissions.schema"
                    item-value="name"
                    item-title="name"
                    :items="schema_list">
          </v-select>
          <v-select label="Table"
                    v-if="['table'].includes(permissions.on)"
                    v-model="permissions.table"
                    :items="[...tables_list]">
          </v-select>
          <!--        <v-select label="View"-->
          <!--                  v-if="['view',].includes(permissions.on)"-->
          <!--                  v-model="permissions.view"-->
          <!--                  :items="['All Views', ...tables_list]">-->
          <!--        </v-select>-->
          <div>
            <v-btn-toggle v-model="permissions.type"
                          rounded="0"
                          color="deep-purple-accent-3"
                          group>
              <v-btn value="grant">
                GRANT
              </v-btn>
              <v-btn value="deny">
                DENY
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-divider class="mt-4"/>
          <p class="mt-4">
            <v-code tag="pre">
              {{ stmt_sql }}
            </v-code>
          </p>
          <v-row class="pt-4">
            <v-col>
              <template v-if="user_store.response_from_add_permissions.type != null">
                <v-alert closable
                         :title="user_store.response_from_add_permissions.title"
                         :text="user_store.response_from_add_permissions.subtitle"
                         :type="user_store.response_from_add_permissions.type"
                         @click:close="user_store.response_from_add_permissions.type = null"
                         variant="tonal"/>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text="Add"
                 color="primary"
                 @click="user_store.add_privilege(stmt_sql)"/>
          <v-btn text="Close"
                 @click="isActive.value = false"/>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
