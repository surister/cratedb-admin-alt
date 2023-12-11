<script setup>
import {computed, ref} from "vue";
import {use_users_store} from "@/store/users";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const dialog = ref(false)
const visible = ref(false)

const user_store = use_users_store()
const title = computed(() => `Alter ${user_store.current_open_user.name}`)

const password = ref(null)
</script>

<template>
  <button-with-dialog tooltip-text="Alter user"
                      dialog-width="600"
                      :activator-btn-disabled="user_store.current_open_user.is_superuser"
                      activator-btn-variant="text"
                      activator-btn-color=""
                      activator-btn-text="alter"
                      :dialog-title="title"
                      dialog-submit-btn-text="alter"
                      :submit-callback="()=> user_store.alter_user(password)">

    <template #dialog-content>
      <v-card-text>

        <v-banner icon="mdi-information">
          <template #text>
            <h4>CreateDB does not support altering the user name.</h4>
          </template>
        </v-banner>

        <v-row justify="center">
          <v-col>
            <v-container>

              <v-label class="my-3" text="New password"/>

              <v-text-field v-model="password"
                            variant="outlined"

                            hint="There are no constraints"
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
