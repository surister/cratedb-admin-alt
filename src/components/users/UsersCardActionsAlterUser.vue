<script setup>
import {computed, ref} from "vue";
import {use_users_store} from "@/store/users";

const dialog = ref(false)
const visible = ref(false)

const user_store = use_users_store()
const title = computed(() => `Alter ${user_store.current_open_user.name}`)

const password = ref(null)
</script>

<template>
  <v-tooltip text="Create new user">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"
             @click="dialog = true"
             text="ALTER"
             flat/>
    </template>
  </v-tooltip>
  <v-dialog max-width="600"
            v-model="dialog">
    <v-card>
      <v-toolbar>
        <v-toolbar-title :text=title />
      </v-toolbar>
      <v-card-text>
        <v-banner icon="mdi-information">
          <template #text>
            <h4>CreateDB does not support altering the user name.</h4>
          </template>
        </v-banner>
        <v-row justify="center">
          <v-col>
            <v-container>
              <v-label>Name</v-label>
              <v-text-field variant="outlined"
                            :disabled="true"/>
              <v-label text="Password"/>
              <v-text-field v-model="password"
                            variant="outlined"
                            :type="visible ? 'text' : 'password'"
                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="visible = !visible"
                            prepend-inner-icon="mdi-lock-outline"/>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary"
               @click="user_store.alter_user(password).then(()=>dialog=false)"
               :disabled="password == null"
               text="Alter"/>
        <v-btn @click="dialog = false"
               text="Close"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
