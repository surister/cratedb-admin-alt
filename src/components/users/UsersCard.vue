<script setup>
import UsersCardPrivilegesLegend from "@/components/users/UsersCardPrivilegesLegend.vue";
import {use_users_store} from "@/store/users";
import UsersCardPrivilegesTable from "@/components/users/UsersCardPrivilegesTable.vue";

const users_store = use_users_store()
</script>

<template>
  <v-card class="pa-5" v-if="users_store.current_open_user != null">
    <v-card-title><h1>{{ users_store.current_open_user.name }}</h1></v-card-title>
    <v-card-subtitle class="mt-2">
      <v-chip
        variant="outlined"
        :color="users_store.current_open_user.is_superuser ? 'pink': ''"
        :prepend-icon="users_store.current_open_user.is_superuser ? 'mdi-shield-crown' : 'mdi-account'"
        :text="users_store.current_open_user.is_superuser ? 'Super user': 'Normal user'"
      >
      </v-chip>
    </v-card-subtitle>
    <v-card-text v-if="users_store.current_open_user.is_superuser">
      The superuser has access to the whole cluster. It is not possible to perform GRANT, DENY or
      REVOKE statements on the superuser.
    </v-card-text>
    <users-card-privileges-legend class="px-4" v-if="!users_store.current_open_user.is_superuser"/>
    <users-card-privileges-table/>
  </v-card>
</template>

<style scoped>

</style>
