<script setup>
import {useNodeInfoStore} from "@/store/nodeInfo";

const node_info_store = useNodeInfoStore()
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item>
        <v-row no-gutters>
          <v-col align-self="center">
            <v-label>Users</v-label>
          </v-col>
          <v-spacer/>
          <v-col>
            <v-btn icon="mdi-cog" flat v-show="false"></v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>
      <v-list-item
          v-for="user in node_info_store.users.users"
          :key="user.name"
          :title="user.name"
          link
      >
        <template #prepend>
          <v-icon
              :color="user.is_superuser ? 'pink': ''"
              :icon="user.is_superuser ? 'mdi-star': 'mdi-account'"/>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
