<script setup>
import {use_tables_store} from "@/store/tables";
import {use_console_store} from "@/store/console_store";
import {useRouter} from "vue-router";
import ButtonWithConfirmDialog from "@/components/shared/buttons/ButtonWithConfirmDialog.vue";
import DialogText from "@/components/shared/text/DialogText.vue";

const table_store = use_tables_store()
const console_store = use_console_store()

const router = useRouter()

async function f() {
  const query = `SELECT * FROM "${table_store.current_open_table.schema}"."${table_store.current_open_table.name}"`
  await router.push({
    name: 'console',
    query: {query: query}
  }).then(() => console_store.content = query)
}
</script>

<template>
  <v-row class="py-4">
    <v-col>
      <v-dialog max-width="600">
        <template v-slot:activator="{ props }">
          <v-btn :disabled="table_store.current_open_schema.is_system"
                 @click="table_store.show_create_table(table_store.current_open_table.name)"
                 v-bind="props"
                 flat
                 text="show create">
          </v-btn>
          <v-btn flat
                 class="ml-1"
                 @click="f();"
                text="query table"/>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar>
              <v-toolbar-title>
                <h2 class="font-weight-bold ml-4">
            <span class="text-blue-accent-1">
              {{
                table_store.current_open_table.schema
              }}</span>.{{ table_store.current_open_table.name }}
                </h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <pre>{{ table_store.current_show_create_table }}</pre>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer/>
              <v-btn text="Close"
                     @click="isActive.value = false"/>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <button-with-confirm-dialog
        :disabled="table_store.current_open_schema.is_system"
        max-width="600"
        text="Drop table"
        dialog-title="Are you sure you want to drop the table?"
        dialog-action-confirm-button-text="YES, DROP"
        @click="table_store.drop_table()">
        <template #card-text>
          <v-card-text>
            This operation
            <v-label style="color: red">cannot be reverted</v-label>, data in the table will be lost.
          </v-card-text>
        </template>
      </button-with-confirm-dialog>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
