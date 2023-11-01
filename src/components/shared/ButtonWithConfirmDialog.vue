<script setup>
const props = defineProps({
  maxWidth: {
    type: Number,
    default: 600,
  },
  btnText: {
    type: String,
  },
  dialogTitle: {
    type: String,
  },
  dialogText: {
    type: String,
  },
  dialogActionConfirmDisabled: {
    required: false,
    type: Boolean,
    default: false,
  },
  dialogActionConfirmButtonText: {
    type: String,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props }">
      <v-btn :disabled="dialogActionConfirmDisabled"
             color="red-lighten-1"
             v-bind="props"
             class="ml-1"
             text
      >{{ btnText }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="dialogTitle">
        <slot name="card-text">
          <v-card-text>
            {{ dialogText }}
          </v-card-text>
        </slot>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="warning"
              prepend-icon="mdi-alert"
              @click="emit('click')">
            {{ dialogActionConfirmButtonText }}
          </v-btn>
          <v-btn
              text="Close"
              @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
