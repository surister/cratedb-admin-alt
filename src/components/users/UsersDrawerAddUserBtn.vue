<script setup>
import {ref} from "vue";
import {use_users_store} from "@/store/users";

const users_store = use_users_store()
const required = (value) => !!value || 'Required'
const dialog = ref(false)
const visible = ref(false)
const name = ref('')
const password = ref('')
</script>

<template>
  <v-tooltip text="Create new user">
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          icon="mdi-account-plus"
          flat
          @click="dialog = true"
      />
    </template>
  </v-tooltip>
  <v-dialog
      max-width="800"
      v-model="dialog">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Create new user</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col>
            <v-label>Name</v-label>
            <v-text-field
                v-model="name"
                variant="outlined"
                :rules="[required,]"/>
          </v-col>
          <v-col>
            <v-label>Password</v-label>
            <v-text-field
                v-model="password"
                variant="outlined"
                :type="visible ? 'text' : 'password'"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible = !visible"
                prepend-inner-icon="mdi-lock-outline"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="secondary" @click="users_store.create_user(name, password).then(()=>dialog=false)">Create</v-btn>
        <v-btn @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
