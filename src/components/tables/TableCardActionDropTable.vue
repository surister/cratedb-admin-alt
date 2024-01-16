<script setup>
import {use_tables_store} from "@/store/tables";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const table_store = use_tables_store()
</script>

<template>
  <button-with-dialog tooltip-text="Delete table"
                      activator-btn-text="DROP"
                      activator-btn-color="red"
                      activator-btn-variant="outline"
                      :activator-btn-disabled="table_store.current_open_schema.is_system"
                      dialog-title="Delete the table"
                      dialog-width="600"
                      dialog-submit-btn-text="YES, DROP"
                      :dialog-close-on-submit="true"
                      dialog-response-component="snackbar"
                      dialog-override-success-component-message="Table dropped successfully"
                      :submit-callback="() => table_store.drop_table()">
    <template #dialog-content>
      <v-card-text>
        This operation
        <v-label style="color: red">cannot be reverted</v-label>
        , data in the table will be lost.
      </v-card-text>
    </template>
  </button-with-dialog>
  <!--  <button-with-confirm-dialog :disabled="table_store.current_open_schema.is_system"-->
  <!--                              :max-width="600"-->
  <!--                              text="Drop table"-->
  <!--                              dialog-title="Are you sure you want to drop the table?"-->
  <!--                              dialog-action-confirm-button-text="YES, DROP"-->
  <!--                              @click="table_store.drop_table()">-->
  <!--    <template #card-text>-->
  <!--      <v-card-text>-->
  <!--        This operation-->
  <!--        <v-label style="color: red">cannot be reverted</v-label>, data in the table will be lost.-->
  <!--      </v-card-text>-->
  <!--    </template>-->
  <!--  </button-with-confirm-dialog>-->
</template>

<style scoped>

</style>
