<script setup>
import {ref} from "vue";
import {use_users_store} from "@/store/users";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const users_store = use_users_store()
const required = (value) => !!value || 'Required'
const visible = ref(false)
const name = ref(null)
const password = ref(null)
</script>

<template>
  <button-with-dialog tooltip-text="Create new user"
                      activator-btn-variant="text"
                      activator-btn-text=""
                      activator-btn-icon="mdi-account-plus"
                      activator-btn-color=""
                      dialog-title="Create new user"
                      dialog-width="600"
                      dialog-submit-btn-text="create"
                      dialog-submit-btn-color="primary"
                      :dialog-submit-btn-disabled="!name"
                      :submit-callback="() => users_store.create_user(name, password)"
                      dialog-response-component="snackbar"
                      dialog-override-success-component-message="User successfully created!"
                      :dialog-close-on-submit="true">
    <template #dialog-content>
      <v-card-text>
        <v-row justify="center">
          <v-col>
            <v-container>
              <v-label>Name</v-label>
              <v-text-field v-model="name"
                            variant="outlined"
                            :rules="[required,]"/>
              <v-label>Password</v-label>
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
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
