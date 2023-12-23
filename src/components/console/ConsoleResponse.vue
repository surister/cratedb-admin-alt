<script setup>
import TracebackDialog from "@/components/console/ConsoleResponseTracebackDialog.vue";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const stored_preferences_store = use_stored_preferences_store()

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
  <v-card v-if="data.type" class="rounded-0 border-s-sm border-e-sm">
    <template #text>

      <span :class="[ data.type === 'success' ? 'text-green-accent-3' : 'text-red-accent-4', 'text-h5' ]">
        {{ data.title }}
      </span> -

      <v-chip label size="small" class="mx-2 mb-1" color="info" v-if="stored_preferences_store.experimental_query_limit">Limited at {{ stored_preferences_store.console.query_limit }} row(s)</v-chip>
      <span class="text-h6">{{ data.subtitle }}</span>

    </template>

    <v-card-actions v-if="data.error_trace">

      <traceback-dialog  :text="data.error_trace"/>

    </v-card-actions>
  </v-card>

</template>

<style scoped>

</style>
