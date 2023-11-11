<script setup>

import {ref} from "vue";

const props = defineProps({
  tooltipText: {
    type: String,
    required: true,
  },
  tooltipLocation: {
    type: String,
    required: false,
    default: 'top'
  },
  activatorBtnText: {
    type: String,
    default: 'Yooo',
  },
  activatorBtnColor: {
    type: String,
    default: 'primary',
  },
  activatorBtnVariant: {
    type: String,
    default: 'elevated'
  },
  dialogTitle: {
    type: String,
  },
  dialogText: {
    type: String
  },
  dialogCloseBtnText: {
    type: String,
    default: 'Close'
  },
  dialogSubmitBtnText: {
    type: String,
    default: 'Submit'
  },
  dialogSubmitBtnColor: {
    type: String,
    default: 'red'
  },
  dialogSubmitBtnVariant: {
    type: String,
    default: 'tonal'
  },
  dialogCloseOnSubmit: {
    type: Boolean,
    default: false,
  },
  promise: {
    type: Promise,
    required: false,
  }
})
const result = ref(null)

function handleClick() {
  props.promise.then((v) => {
    result.value = v
  })

  emit("onSubmit")
}

const emit = defineEmits(['onSubmit'])
const dialog = ref(false)
</script>

<template>
  <v-tooltip :text="tooltipText"
             :location="tooltipLocation">
    <template v-slot:activator="{ props }">
      <v-btn :color="activatorBtnColor"
             :variant="activatorBtnVariant"
             v-bind="props">
        {{ activatorBtnText }}
        <v-dialog v-model="dialog"
                  activator="parent"
                  width="auto">
          <v-card>
            <slot name="dialog-title">
              <v-toolbar>
                <v-toolbar-title :text="dialogTitle"/>
              </v-toolbar>
            </slot>
            <slot name="dialog-content">
              <v-card-text>
                {{ dialogText }}
              </v-card-text>
            </slot>
            <v-card-text v-if="result != null">
              <v-alert closable variant="tonal"
                       :color="result.type"
                       :title="result.title"
                       :text="result.subtitle"
                       @click:close="result = null"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="dialog = false"
                     :text="dialogCloseBtnText"/>
              <v-btn :color="dialogSubmitBtnColor"
                     :text="dialogSubmitBtnText"
                     :variant="dialogSubmitBtnVariant"
                     @click="handleClick"/>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>
