<script setup>
import {VAceEditor} from "vue3-ace-editor";

import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {ref} from "vue";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()


const props = defineProps({
  minLines: {
    default: null,
    type: [Number, String]
  },
  maxLines: {
    default: null,
    type: [Number, String]
  }
})
</script>

<template>
  <VAceEditor
      v-model:value="console_store.consoles[console_store.current_console_index].content"
      lang="sql"
      :style="{ 'font-size': stored_preferences.console.font_size + 'px' }"
      :min-lines="minLines || Number.parseInt(stored_preferences.console.min_lines)"
      :max-lines="maxLines || Number.parseInt(stored_preferences.console.max_lines)"/>
</template>

<style scoped>

</style>
