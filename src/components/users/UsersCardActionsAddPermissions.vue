<script setup>
import {computed, ref} from "vue";
import {use_users_store} from "@/store/users";
import {use_tables_store} from "@/store/tables";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const permissions = ref({})

const user_store = use_users_store()
const table_store = use_tables_store()

const stmt_sql = computed(() => {
  let stmt = permissions.value.type || ''

  if (permissions.value.permission != null) {
    stmt += ` ${permissions.value.permission}\n`
  }

  if (permissions.value.on != null && permissions.value.on !== 'cluster') {
    stmt += ` ON ${permissions.value.on.toUpperCase()}`
    stmt += ` ${permissions.value.schema != null ? `"${permissions.value.schema}"` : "{schema}"}`
    stmt += `${permissions.value.table != null ? '.' + `"${permissions.value.table}"` : ''}`
  }

  stmt += ' TO ' + user_store.current_open_user.name
  return stmt
})

const schema_list = computed(() => table_store.schemas.schemas.filter((schema) => !schema.is_system))

const tables_list = computed(() => {
  // We do this early shortcut to avoid computing stuff when it's not needed.
  if (['table', 'view'].includes(permissions.value.on) && permissions.value.schema != null)
    return table_store.schemas.schemas.filter((schema) => schema.name === permissions.value.schema)[0].tables.map((table) => table.name)
  return []
})

</script>

<template>
  <button-with-dialog tooltip-text="Add new permissions to user"
                      activator-btn-color="white"
                      activator-btn-variant="text"
                      activator-btn-text="add permissions"
                      :activator-btn-disabled="user_store.current_open_user.is_superuser"
                      dialog-title="Add permissions"
                      dialog-submit-btn-text="add"
                      dialog-submit-btn-color="primary"
                      dialog-width="500"
                      :dialog-submit-btn-disabled="permissions.permission == null || permissions.type == null"
                      dialog-override-success-component-message="Privilege added!"
                      :submit-callback="() => user_store.add_privilege(stmt_sql, permissions)">
    <template #dialog-content>
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
                  clearable
                  item-value="name"
                  item-title="name"
                  :items="schema_list">
        </v-select>
        <v-select label="Table"
                  v-if="['table', 'view'].includes(permissions.on)"
                  v-model="permissions.table"
                  :items="[...tables_list]">
        </v-select>
        <v-label class="my-3" v-if="['view',].includes(permissions.on)">Views and tables can both be
          found in Table select
        </v-label>
        <!--                  <v-select label="View"-->
        <!--                            v-if="['view',].includes(permissions.on)"-->
        <!--                            v-model="permissions.view"-->
        <!--                            :items="['All Views', ...views_list]">-->
        <!--                  </v-select>-->
        <div>
          <v-btn-toggle v-model="permissions.type"
                        rounded="0"
                        color="deep-purple-accent-3"
                        group>
            <v-btn value="GRANT">
              GRANT
            </v-btn>
            <v-btn value="DENY">
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
      </v-card-text>
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
