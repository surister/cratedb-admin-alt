<script setup>
import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {ref} from "vue";

const console_store = use_console_store()
const stored_preferences_store = use_stored_preferences_store()

const dialog = ref(false)
const name = ref()

</script>

<template>
  <v-tooltip text="Save query" location="top">
    <template v-slot:activator="{ props }">
      <v-btn class="ml-2"
             variant="tonal"
             icon="mdi-content-save"
             v-bind="props"
             size="small"
             :disabled="!(console_store.current_console.content !== '')"
             @click="dialog = true">
      </v-btn>
    </template>
  </v-tooltip>
  <v-dialog v-model="dialog"
            max-width="400">
    <v-card>
      <v-card-text>
        <v-label class="pb-4" text="Name"/>
        <v-text-field :autofocus="true"
                      v-model="name"/>
        <v-card-actions class="text-right">
          <v-spacer/>
          <v-btn color="primary"
                 @click="stored_preferences_store.save_query(name, console_store.current_console.content); dialog = false"
                 :disabled="name == null"
                 text="save"/>
          <v-btn text="close"
                 @click="dialog = false"/>
        </v-card-actions>
      </v-card-text>

    </v-card>

  </v-dialog>
</template>

<style scoped>

</style>
