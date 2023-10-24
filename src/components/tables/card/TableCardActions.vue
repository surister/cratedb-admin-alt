<script setup>
import {use_tables_store} from "@/store/tables";

const table_store = use_tables_store()
</script>

<template>
  <v-row class="py-4">
    <v-col>
      <v-btn flat>Edit schema</v-btn>
      <v-dialog max-width="600">
        <template v-slot:activator="{ props }">
          <v-btn :disabled="table_store.current_open_schema.is_system" color="red-lighten-1" text
                 v-bind="props">Drop table
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Are you sure you want to drop the table?">
            <v-card-text>
              This operation
              <v-label style="color: red">cannot be reverted</v-label>
              , data in the table will be lost.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" prepend-icon="mdi-alert" @click="table_store.drop_table()">Drop
                table
              </v-btn>
              <v-btn
                  text="Close"
                  @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>
