<script setup>

import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {use_repositories_store} from "@/store/repositories";
import {ref} from "vue";
const repository_store = use_repositories_store()


const name = ref()
const path = ref()

</script>

<template>
  <button-with-dialog tooltip-text="Add new repository"
                      activator-btn-variant="text"
                      activator-btn-text=""
                      activator-btn-icon="mdi-plus-box"
                      activator-btn-color="white"
                      dialog-width="600"
                      dialog-title="Create new repository"
                      :submit-callback="() => repository_store.create_repository(name, 'fs', {location: path})">
    <template #dialog-content>
      <v-container>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="path" v-model="path"></v-text-field>
      </v-container>
    </template>
  </button-with-dialog>
</template>

<style scoped>

</style>
