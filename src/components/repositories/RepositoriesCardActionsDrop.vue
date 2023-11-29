<script setup>

import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {use_repositories_store} from "@/store/repositories";

const repository_store = use_repositories_store()
</script>

<template>
  <button-with-dialog tooltip-text="Drop repository"
                      activator-btn-text="Drop"
                      activator-btn-color="red"
                      dialog-submit-btn-text="YES, DROP"
                      dialog-submit-btn-color="red"
                      dialog-title="Drop repository"
                      dialog-width="600"
                      :submit-callback="() => repository_store.drop_repository()"
                      dialog-response-component="snackbar"
                      dialog-override-success-component-message="Deleted successfully!"
  >

    <template #dialog-content>
      <v-banner color="info" icon="mdi-information" elevation="">

        <template #text>
          <p>
            When you drop a repository, CrateDB deletes the corresponding record from
            sys.repositories
            but does not delete any snapshots from the corresponding backend data storage.
            <br><br>
            If you create
            a new repository using the same backend data storage, any existing snapshots will become
            available again.
            <br><br>
            Read more about it in <a
            href="https://cratedb.com/docs/crate/reference/en/latest/sql/statements/drop-repository.html">here</a>
          </p>
        </template>
      </v-banner>
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
