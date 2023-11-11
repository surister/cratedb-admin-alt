<script setup>
import {ref} from "vue";
import {use_tables_store} from "@/store/tables";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const table_store = use_tables_store()

const name = ref()
</script>

<template>
  <button-with-dialog tooltip-text="Alter table name"
                      activator-btn-text="rename"
                      activator-btn-variant="text"
                      activator-btn-color=""
                      dialog-title="New name"
                      dialog-width="400"
                      dialog-submit-btn-text="alter"
                      dialog-submit-btn-variant="text"
                      :dialog-submit-btn-disabled="name == null"
                      :submit-callback="() => table_store.rename_table(name)">
    <template #dialog-content>
      <v-card-text>
        <v-text-field variant="outlined"
                      hint="New table name"
                      v-model="name"
                      class="py-2"
                      clearable/>
      </v-card-text>
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
