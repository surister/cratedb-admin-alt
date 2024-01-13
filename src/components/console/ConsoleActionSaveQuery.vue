<script setup>
import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {ref} from "vue";
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";

const console_store = use_console_store()
const stored_preferences_store = use_stored_preferences_store()
const name = ref()
</script>

<template>
  <button-with-dialog tooltip-text="Save query"
                      activator-btn-color=""
                      activator-btn-icon="mdi-content-save"
                      activator-btn-text=""
                      dialog-width="350"
                      dialog-override-success-component-message="Query added"
                      dialog-submit-btn-color="primary"
                      dialog-submit-btn-text="Save"
                      :dialog-submit-btn-disabled="!name"
                      :activator-btn-disabled="!console_store.current_console.content"
                      :submit-callback="() => stored_preferences_store.save_query(name, console_store.current_console.content)">
    <template #dialog-content>
      <v-card-text>
        <v-label class="pb-4" text="Name"/>
        <v-text-field :autofocus="true"
                      variant="outlined"
                      hide-details
                      v-model="name"/>
      </v-card-text>
    </template>

  </button-with-dialog>
</template>
<style scoped>

</style>
