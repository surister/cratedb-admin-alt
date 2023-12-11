<script setup>
import {computed, ref} from "vue";
import {use_tables_store} from "@/store/tables";
import {use_node_info_store} from "@/store/node_info";
import VersionNotice from "@/components/shared/VersionNotice.vue";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const table_store = use_tables_store()
const node_store = use_node_info_store()
const name = ref()

const disabled = computed(() => {
  return table_store.current_open_table.is_view() && !node_store.is_compatible('5.5.0')
})
</script>

<template>
  <button-with-dialog tooltip-text="Alter table name"
                      activator-btn-text="rename"
                      activator-btn-variant="text"
                      activator-btn-color=""
                      :activator-btn-disabled="table_store.current_open_schema.is_system"
                      dialog-title="Change table name"
                      dialog-width="500"
                      dialog-submit-btn-text="alter"
                      dialog-override-success-component-message="Name changed successfully!"
                      :dialog-submit-btn-disabled="disabled"
                      :submit-callback="() => table_store.rename_table(name)">
    <template #dialog-content>
      <v-card-text>
        <version-notice version="5.5.0" v-if="disabled"></version-notice>
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
