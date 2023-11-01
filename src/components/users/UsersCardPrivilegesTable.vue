<script setup>
import {use_users_store} from "@/store/users";
import {adaptVTableHeader} from "@/store/utils";

const users_store = use_users_store()

const headers = adaptVTableHeader([
  'class_',
  'Grantor',
  'Ident',
  'State',
  'Type',
  'Actions',
])
</script>

<template>
    <v-data-table
      v-if="!users_store.current_open_user.is_superuser"
      title="Privileges"
      class="mt-5"
      :headers="headers"
      :items="users_store.current_open_user.privileges_to_items()"
    >
      <template #top>Current privileges</template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip text="Revoke permission">
          <template v-slot:activator="{ props }">
            <v-btn
              :disabled="item.ident == null"
              v-bind="props"
              icon="mdi-eye-remove"
              flat
              @click="users_store.revoke_permission(
                    item
                )"></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
</template>

<style scoped>

</style>
