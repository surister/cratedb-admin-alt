<script setup>
import {use_tables_store} from "@/store/tables";
import ConsoleEditorReadOnly from "@/components/console/ConsoleEditorReadOnly.vue";

const table_store = use_tables_store()
</script>

<template>
  <v-dialog max-width="1000">
    <template v-slot:activator="{ props }">
      <v-btn :disabled="table_store.current_open_schema.is_system"
             @click="table_store.show_create_table()"
             v-bind="props"
             flat
             text="show create">
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            <h2 class="font-weight-bold">
            <span class="text-blue-accent-1">
              {{
                table_store.current_open_table.schema
              }}</span>.{{ table_store.current_open_table.name }}
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <console-editor-read-only :content="table_store.current_show_create_table"/>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
