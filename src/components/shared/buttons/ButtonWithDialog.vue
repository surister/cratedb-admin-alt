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
  activatorBtnColor: {
    type: String,
    default: 'primary',
  },
  activatorBtnVariant: {
    type: String,
    default: 'elevated'
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
  }
})
const result = ref({})

function handleClick() {
  // We expect the received function to ultimately return a dictionary.
  props.submitCallback().then(async (res) => {
      result.value = {}
    if (res.ok) {
      result.value['type'] = 'success'
      result.value['title'] = props.dialogOverrideSuccessComponentMessage != null ? props.dialogOverrideSuccessComponentMessage : props.dialogResponseComponentMessage['success']
    } else {
      result.value['type'] = 'error'
      result.value['title'] = props.dialogResponseComponentMessage['error']

      const data = await res.json()
      result.value['message'] = data.error.message
    }

    emit("onSubmit")

    if (props.dialogResponseComponent === 'snackbar') {
      const store = use_global_store()
      if (result.value.type === 'success') {
        store.show_successful_snackbar(result.value.title)
      } else {
        store.show_error_snackbar(result.value.message)
      }
    }
    if (props.dialogCloseOnSubmit) {
      dialog.value = false
    }
  })
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
               :disabled="activatorBtnDisabled"
               :icon="activatorBtnIcon"
               v-bind="props">
            {{ activatorBtnText }}
            <template v-if="activatorBtnIcon">
                <v-icon>{{ activatorBtnIcon }}</v-icon>
            </template>
            <v-dialog v-model="dialog"
                      activator="parent"
                      :width="dialogWidth">
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
                    <template v-if="dialogResponseComponent === 'alert'">
                        <v-card-text v-if="result.type != null">
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
                        <v-btn :color="dialogSubmitBtnColor"
                               :text="dialogSubmitBtnText"
                               :variant="dialogSubmitBtnVariant"
                               :disabled="dialogSubmitBtnDisabled"
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
