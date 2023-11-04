<script setup>
import {VAceEditor} from "vue3-ace-editor";

import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()
</script>

<template>
      <v-card>
        <VAceEditor v-model:value="console_store.content"
                    lang="sql"
                    :style="{ 'font-size': stored_preferences.console.font_size + 'px' }"
                    :min-lines="stored_preferences.console.min_lines"
                    :max-lines="stored_preferences.console.max_lines"/>
      </v-card>
</template>

<style scoped>

</style>
