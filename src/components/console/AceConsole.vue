<script setup>
import {VAceEditor} from "vue3-ace-editor";
import {useConsoleStore} from "@/store/consoleStore";
import {useStoredPreferencesStore} from "@/store/storedPreferences";
const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()
</script>

<template>
      <v-card>
        <VAceEditor
        v-model:value="consoleStore.content"
        lang="sql"
        :style="{ 'font-size': storedPreferences.console.fontSize + 'px' }"
        :min-lines="storedPreferences.console.minLines"
        :max-lines="storedPreferences.console.maxLines">
      </VAceEditor>
      </v-card>
</template>

<style scoped>

</style>
