<script setup>
import ButtonWithConfirmDialog from "@/components/shared/buttons/ButtonWithConfirmDialog.vue";

import {use_users_store} from "@/store/users";

const users_store = use_users_store()
</script>

<template>
  <button-with-confirm-dialog
    text="DELETE"
    :disabled="users_store.current_open_user.is_superuser"
    dialog-title="Are you sure you want to delete the user?"
    dialog-action-confirm-button-text="YES, DELETE"
    @click="users_store.drop_user()"
  >
    <template #card-text>
      <v-card-text>
        This operation
        <v-label style="color: red">cannot be reverted</v-label>
        , the user will be lost.
      </v-card-text>
    </template>
  </button-with-confirm-dialog>
</template>
