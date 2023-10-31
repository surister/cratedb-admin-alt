<script setup>
import {VAceEditor} from "vue3-ace-editor";

import {use_console_store} from "@/store/console_store";
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const console_store = use_console_store()
const stored_preferences = useStoredPreferencesStore()
</script>

<template>
      <v-card>
        <VAceEditor
        v-model:value="console_store.content"
        lang="sql"
        :style="{ 'font-size': stored_preferences.console.fontSize + 'px' }"
        :min-lines="stored_preferences.console.minLines"
        :max-lines="stored_preferences.console.maxLines">
      </VAceEditor>
      </v-card>
</template>

<style scoped>

</style>
