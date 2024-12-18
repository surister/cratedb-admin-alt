<script setup>

import {ref} from "vue";
import {use_global_store} from "@/store/global_store";

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
  activatorBtnDisabled: {
    type: Boolean,
    default: false
  },
  activatorBtnText: {
    type: String,
    default: 'activator',
  },
  activatorBtnIcon: {
    type: String,
    default: null
  },
  activatorBtnSize: {
    type: String,
    default: 'small'
  },
  activatorBtnColor: {
    type: String,
    default: 'primary',
  },
  activatorBtnVariant: {
    type: String,
    default: 'elevated'
  },
  activatorBtnClasses: {
    type: Array,
    default: []
  },
  dialogWidth: {
    type: String,
    default: 'auto'
  },
  dialogTitle: {
    type: String,
  },
  dialogText: {
    type: String
  },
  removeDialogSubmitBtn: {
    type: Boolean,
    default: false,
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
  dialogSubmitBtnDisabled: {
    type: Boolean,
    default: false
  },
  dialogCloseOnSubmit: {
    type: Boolean,
    default: false,
  },
  dialogResponseComponent: {
    type: String, // Accepts 'banner and snackbar'
    default: 'alert'
  },
  dialogOverrideSuccessComponentMessage: {
    type: String,
    default: null
  },
  dialogResponseComponentMessage: {
    type: Object,
    default: {
      success: 'Success!',
      error: 'Something went wrong!'
    }
  },
  submitCallback: {
    type: Function,
    required: false,
  },
})
const result = ref({})
const loading = ref(false)

async function handleClick() {
  loading.value = true

  props.submitCallback().then(async (res) => {
    // We expect the received function to return a dictionary.
    result.value = {}
    const data = await res.json()
    if (res.ok) {
      result.value['type'] = 'success'
      result.value['title'] = props.dialogOverrideSuccessComponentMessage ? props.dialogOverrideSuccessComponentMessage : props.dialogResponseComponentMessage['success']
      result.value['data'] = data
    } else {
      result.value['type'] = 'error'
      result.value['title'] = props.dialogResponseComponentMessage['error']
      result.value['message'] = data.error.message
    }

    emit("onSubmit")
    emit("onResponse", result.value)

    if (props.dialogResponseComponent === 'snackbar') {
      const store = use_global_store()
      if (result.value.type === 'success') {
        store.show_successful_snackbar(result.value.title)
      } else {
        store.show_error_snackbar(result.value.message)
      }
    }
    loading.value = false
    if (props.dialogCloseOnSubmit) {
      dialog.value = false
    }
  })
}

const emit = defineEmits(['onSubmit', 'onResponse'])
const dialog = ref(false)

</script>

<template>
  <v-tooltip :text="tooltipText"
             :location="tooltipLocation">
    <template v-slot:activator="{ props }">
      <v-btn :color="activatorBtnColor"
             :variant="activatorBtnVariant"
             :disabled="activatorBtnDisabled"
             :icon="activatorBtnIcon"
             :class="activatorBtnClasses"
             :size="activatorBtnSize"
             v-bind="props">
        {{ activatorBtnText }}
        <template v-if="activatorBtnIcon">
          <v-icon>{{ activatorBtnIcon }}</v-icon>
        </template>
        <v-dialog v-model="dialog"
                  activator="parent"
                  :width="dialogWidth">
          <v-card elevation="0">
            <slot name="dialog-title" v-if="dialogTitle">
              <v-toolbar>
                <v-toolbar-title :text="dialogTitle"/>
              </v-toolbar>
            </slot>
            <slot name="dialog-content">
              <v-card-text>
                {{ dialogText }}
              </v-card-text>
            </slot>
            <template v-if="dialogResponseComponent === 'alert'">
              <v-card-text v-if="result.type">
                <v-alert closable variant="tonal"
                         :color="result.type"
                         :title="result.title"
                         :text="result.message"
                         @click:close="result = {}"/>
              </v-card-text>
            </template>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="dialog = false"
                     :text="dialogCloseBtnText"/>
              <v-btn v-if="!removeDialogSubmitBtn"
                     :color="dialogSubmitBtnColor"
                     :text="dialogSubmitBtnText"
                     :variant="dialogSubmitBtnVariant"
                     :disabled="dialogSubmitBtnDisabled"
                     :loading="loading"
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
