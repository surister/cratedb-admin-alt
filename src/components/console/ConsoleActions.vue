<script setup>
import {useConsoleStore} from "@/store/consoleStore";
import {useStoredPreferencesStore} from "@/store/storedPreferences";

const consoleStore = useConsoleStore()
const storedPreferences = useStoredPreferencesStore()
function do_query() {
  consoleStore.queryFromConsole()
  storedPreferences.addToQueryHistory(consoleStore.content)
}
</script>

<template>
  <v-btn :loading="consoleStore.queryIsRunning" size="x-large" @click="do_query"
         :disabled="consoleStore.content.length === 0">Submit
  </v-btn>
  <v-tooltip location="bottom" text="Stop running query">
    <template v-slot:activator="{ props }">
      <v-btn size="x-large" prepend-icon="mdi-cancel" v-bind="props" class="mx-2"
             :disabled="!consoleStore.queryIsRunning" @click="consoleStore.cancelQuery()">Cancel
        query
      </v-btn>
    </template>
  </v-tooltip>
  <v-tooltip text="Copy query link to clipboard">
    <template v-slot:activator="{ props }">
    </template>
  </v-tooltip>

  <v-btn size="x-large" @click="storedPreferences.console.addQueryToHistory = !storedPreferences.console.addQueryToHistory">
    <template #default ><span class="mb-6">Add query to history</span></template>
    <template #prepend>
      <v-checkbox
                  v-model="storedPreferences.console.addQueryToHistory">
      </v-checkbox>
    </template>
  </v-btn>

</template>html body div#app div.v-application.v-theme--dark.v-layout.v-layout--full-height.v-locale--is-ltr div.v-application__wrap main.v-main div.v-container.v-container--fluid.v-locale--is-ltr.px-10 div.v-row div.v-col.v-col-9 div.v-row div.v-col.mt-6 button.v-btn.v-btn--elevated.v-theme--dark.v-btn--density-default.v-btn--size-x-large.v-btn--variant-elevated span.v-btn__prepend div.v-input.v-input--horizontal.v-input--center-affix.v-input--density-default.v-locale--is-ltr.v-input--dirty.v-input--disabled.v-checkbox div.v-input__control div.v-selection-control.v-selection-control--disabled.v-selection-control--density-default.v-checkbox-btn div.v-selection-control__wrapper div.v-selection-control__input

<style scoped>
.v-btn__prepend.no-inline-margin-left {
  margin-inline-end: 0 !important;
}
</style>
