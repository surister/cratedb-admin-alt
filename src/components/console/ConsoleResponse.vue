<script setup>
import {use_console_store} from "@/store/console_store";
import TracebackDialog from "@/components/console/ConsoleResponseTracebackDialog.vue";

const console_store = use_console_store()

const props = defineProps(
    {
      data: {
        type: Object,
        default: null
      }
    }
)
</script>

<template>
  <v-card v-if="data.type != null" border class="rounded-0">
    <template #title>
      <p :class="[ data.type === 'success' ? 'text-green-accent-3' : 'text-red-accent-4' ]">
        {{ data.title }}</p>
    </template>
    <template #text>
      <p style="font-size: 20px">{{ data.subtitle }}</p>
    </template>
    <v-card-actions>
      <traceback-dialog v-if="data.error_trace != null" :text="data.error_trace"/>
      <v-btn @click="console_store.set_console_response_to_empty()">Clear</v-btn>
    </v-card-actions>
  </v-card>


</template>

<style scoped>

</style>
