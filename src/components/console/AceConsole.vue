<script setup>
import {VAceEditor} from "vue3-ace-editor";
import {useConsoleStore} from "@/store/consoleStore";
const consoleStore = useConsoleStore()
</script>

<template>
      <v-card>
        <VAceEditor
        v-model:value="consoleStore.content"
        lang="sql"
        style="font-size: 25px"
        :min-lines="10"
        :max-lines="10">
      </VAceEditor>
      </v-card>
</template>

<style scoped>

</style>
