<script setup>

import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {use_repositories_store} from "@/store/repositories";

const repository_store = use_repositories_store()

const props = defineProps({
  snapshot_name: {
    required: true
  }
})
</script>

<template>
  <button-with-dialog tooltip-text="Drop snapshot"
                      activator-btn-text="drop"
                      activator-btn-color="orange"
                      :activator-btn-classes="['mx-2']"
                      activator-btn-variant="outline"
                      dialog-title="Drop snapshot"
                      dialog-width="500"
                      dialog-submit-btn-text="YES, DROP"
                      :submit-callback="()=>repository_store.drop_snapshot(snapshot_name)">
    <template #dialog-content>
      <v-card-text>
        This operation
        <v-label style="color: red">cannot be reverted</v-label>
        , the snapshot will be deleted.
      </v-card-text>
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
