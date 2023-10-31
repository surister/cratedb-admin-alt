<script setup>

import UsersDrawer from "@/components/users/UsersDrawer.vue";
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

const privileges_type = [
  {
    acronym: 'DQL',
    color: '',
    name: 'Data Query Language',
    allows: ['SELECT', 'SHOW', 'REFRESH', 'COPY TO'],
    and: 'user-defined functions'
  },
  {
    acronym: 'DML',
    color: '',
    name: 'Data Manipulation Language',
    allows: ['INSERT', 'COPY FROM', 'UPDATE', 'DELETE'],
  },
  {
    acronym: 'DDL',
    color: '',
    name: 'Data Definition Language',
    allows: ['CREATE TABLE', 'DROP TABLE', 'CREATE VIEW',
      'DROP VIEW', 'CREATE FUNCTION', 'DROP FUNCTION',
      'CREATE REPOSITORY', 'DROP REPOSITORY', 'CREATE SNAPSHOT',
        'DROP SNAPSHOT', 'RESTORE SNAPSHOT', 'ALTER TABLE'
    ],
  }
]
</script>

<template>
  <users-drawer/>
  <v-card class="pa-5" v-if="users_store.current_open_user != null">
    <v-card-title><h1>{{ users_store.current_open_user.name }}</h1></v-card-title>
    <v-card-subtitle class="mt-2">
      <v-chip
          variant="outlined"
          :color="users_store.current_open_user.is_superuser ? 'pink': ''"
          :prepend-icon="users_store.current_open_user.is_superuser ? 'mdi-shield-crown' : 'mdi-account'">
        <template v-if="users_store.current_open_user.is_superuser">
          Super
        </template>
        <template v-else>
          Normal
        </template>
        user
      </v-chip>
    </v-card-subtitle>
    <v-card-text v-if="users_store.current_open_user.is_superuser">
      The superuser has access to the whole cluster. It is not possible to perform GRANT, DENY or
      REVOKE statements on the superuser.
    </v-card-text>
    <p class="px-4">
      <template v-for="(privilege, i) in privileges_type" :key="i">
        <br>
        <v-chip variant="elevated"><strong>{{ privilege.acronym }}</strong>
        </v-chip>
        {{ privilege.name }}, allows to execute:
        <v-chip class="mr-1 my-2" size="small" v-for="action in privilege.allows">{{
            action
          }}
        </v-chip>
      </template>
    </p>
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
                    item.type, item.class_, item.ident, users_store.current_open_user.name, item.id
                )"></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>

</template>

<style scoped>

</style>
