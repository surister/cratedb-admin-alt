<script setup>

import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {computed, ref} from "vue";
import {use_tables_store} from "@/store/tables";
import {use_repositories_store} from "@/store/repositories";

const repository_store = use_repositories_store()
const table_store = use_tables_store()

const tables_list = computed(() => {
  let _tables = []
  // We do this early shortcut to avoid computing stuff when it's not needed.
  for (const schema of table_store.schemas.schemas) {
    if (!schema.is_system){
      for (const table of schema.tables) {
        if (!table.is_view()){
          _tables.push(`"${schema.name}"."${table.name}"`)
        }
      }
    }
  }

  return _tables
})
const options = ref({wait_for_completion: false, ignore_unavailable: false})
</script>

<template>
  <button-with-dialog tooltip-text="Create new snapshot"
                      :activator-btn-classes="['mr-2']"
                      activator-btn-color="white"
                      activator-btn-variant="text"
                      activator-btn-text="create snapshot"
                      dialog-title="Create new snapshot"
                      dialog-submit-btn-color="primary"
                      dialog-submit-btn-text="Create"
                      dialog-width="600"
                      :submit-callback="() => repository_store.create_snapshot(options)">

    <template #dialog-content>
      <v-container>

        <v-row>
          <v-col>
            <v-text-field v-model="options.name" label="Snapshot name"/>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-checkbox label="Wait for completion" v-model="options.wait_for_completion"/>
          </v-col>

          <v-col>
            <v-checkbox label="Ignore unavailable" v-model="options.ignore_unavailable"/>
          </v-col>

          <v-col>
            <v-checkbox label="All tables" v-model="options.all_tables"/>
          </v-col>
        </v-row>

        <v-row no-gutters>

          <v-col>
            <v-select label="Tables"
                      multiple clearable
                      :items="tables_list"
                      v-model="options.tables"
                      :disabled="options.all_tables"
                      chips/>
          </v-col>

        </v-row>

      </v-container>
    </template>
  </button-with-dialog>

</template>

<style scoped>

</style>
