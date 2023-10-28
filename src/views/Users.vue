<script setup>

import UsersDrawer from "@/components/users/UsersDrawer.vue";
import {use_users_store} from "@/store/users";
import {adaptVTableHeader} from "@/store/utils";

const users_store = use_users_store()

const headers = adaptVTableHeader([
  'class_',
  'grantor',
  'ident',
  'state',
  'type'
])
</script>

<template>
<users-drawer>
</users-drawer>
  <v-card class="pa-5" v-if="users_store.current_open_user != null">
    <v-card-title><h1>{{ users_store.current_open_user.name }}</h1></v-card-title>
    <v-card-subtitle class="mt-2">
      <v-chip>
        <template v-if="users_store.current_open_user.is_superuser">
          Super
        </template>
        <template v-else>
          Normal
        </template>
        user
      </v-chip>
    </v-card-subtitle>
    <v-card-text>
      The superuser has access to the whole cluster. It is not possible to perform GRANT, DENY or
      REVOKE statements on the superuser.
    </v-card-text>
    <v-data-table
      title="Privileges"
      class="mt-5"
      :headers="headers"
      :items="users_store.current_open_user.to_items()"
      item-value="name"
    ></v-data-table>
  </v-card>

</template>

<style scoped>

</style>
