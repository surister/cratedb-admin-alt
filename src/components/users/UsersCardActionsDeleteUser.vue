<script setup>


import {use_users_store} from "@/store/users";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const users_store = use_users_store()
</script>

<template>
  <button-with-dialog tooltip-text="Delete user"
                      activator-btn-text="DROP"
                      activator-btn-color="red"
                      activator-btn-variant="outline"
                      :activator-btn-disabled="users_store.current_open_user.is_superuser"
                      dialog-title="Delete current user"
                      dialog-width="600"
                      dialog-response-component="snackbar"
                      dialog-submit-btn-text="YES, DROP"
                      :dialog-close-on-submit="true"
                      :submit-callback="() => users_store.drop_user()">
    <template #dialog-content>
      <v-card-text>
        This operation
        <v-label style="color: red">cannot be reverted</v-label>
        , the user will be lost.
      </v-card-text>
    </template>

  </button-with-dialog>
</template>
