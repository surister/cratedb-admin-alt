<script setup>

import ConsoleEditor from "@/components/console/ConsoleEditor.vue";
import {useClipboard} from "@vueuse/core";
import {ref} from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  show_run: {
    type: Boolean,
    default: false
  },
  callable: {
    type: Function,
  },
  max_lines: {
    type: Number,
    default: 30
  },
  font_size: {
    type: Number,
    default: 15
  }
})
const {text, copy, copied, isSupported} = useClipboard()

const button_states = {
  copied: {color: 'success', text: 'copied', icon: 'mdi-check'},
  normal: {color: 'transparent', text: 'copy'}
}

const button_state = ref(button_states.normal)

async function copy_content(content) {
  await copy(content)
  if (copied){
    button_state.value = button_states.copied
    setTimeout(function () {
      button_state.value = button_states.normal
      console.log(button_state.value)
    }, 3000)
  }
}
</script>

<template>
  <v-card class="rounded-0 border-s-sm">
    <v-card-title class="pa-0">
      <console-editor style="outline: 1px solid #c2c2c2"
                      :content="content"
                      :min-lines="1"
                      :max-lines="max_lines"
                      :font_size="font_size"
                      :read_only="true"
                      :unclickable="false"
                      :hide_cursor="true"/>
    </v-card-title>
    <v-card-actions class="pt-2">

      <v-btn @click="callable" v-if="show_run">run</v-btn>
      <v-badge :icon="button_state.icon"
               :color="button_state.color">
        <v-btn @click="copy_content(content)"
               :text="button_states.normal.text"/>
      </v-badge>
    </v-card-actions>

  </v-card>
</template>

<style scoped>

</style>
