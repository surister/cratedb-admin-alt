<script setup>
import TracebackDialog from "@/components/console/ConsoleResponseTracebackDialog.vue";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import {computed} from "vue";

const stored_preferences_store = use_stored_preferences_store()

const props = defineProps(
    {
      data: {
        type: Object,
        default: null
      }
    }
)
const is_success = computed(()=> props.data.type === 'success')
</script>

<template>
  <v-card v-if="data.type"
          rounded="0"
          elevation="0">

    <v-card-text class="ma-0">
      <v-icon size="small">mdi-console-line</v-icon>
      [{{ data.timestamp }}]:
      <v-chip label size="small" class="mb-1" color="info"
              v-if="stored_preferences_store.experimental_query_limit">Limited at
        {{ stored_preferences_store.console.query_limit }} row(s)
      </v-chip>
      <span
        :class="[ data.type === 'success' ? 'text-green-accent-3' : 'text-red-accent-4', 'mx-1', 'pb-2'] ">
                  <v-icon :icon="is_success ? 'mdi-check' : 'mdi-alert-decagram'"></v-icon>
            </span>
      <span class="text-h7">{{ data.subtitle }}</span>
    </v-card-text>

    <v-card-actions v-if="data.error_trace">

      <traceback-dialog :text="data.error_trace"/>

    </v-card-actions>

  </v-card>

</template>

<style scoped>

</style>
