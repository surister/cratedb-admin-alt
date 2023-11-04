<script setup>
import {use_node_info_store} from "@/store/node_info";
import {use_users_store} from "@/store/users";
import UsersDrawerAddUserBtn from "@/components/users/UsersDrawerAddUserBtn.vue";

const node_info_store = use_node_info_store()
const users_store = use_users_store()
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>
        <v-row no-gutters>
          <v-col align-self="center">
            <v-label>Users</v-label>
          </v-col>
          <v-spacer></v-spacer>
          <v-spacer/>
          <v-col>
          <users-drawer-add-user-btn/>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>
      <v-list-item
          v-for="user in node_info_store.users.users"
          :value="user.name"
          :key="user.name"
          :title="user.name"
          @click="users_store.current_open_user = user"
          link
      >
        <template #prepend>
          <v-icon
              :color="user.is_superuser ? 'pink': ''"
              :icon="user.is_superuser ? 'mdi-shield-crown': 'mdi-account'"/>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
