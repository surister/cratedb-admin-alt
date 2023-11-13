<script setup>
const props = defineProps({
  version: {
    type:String,
    required: true
  }
})
</script>

<template>
  <v-alert color="yellow" class="my-2">
    <v-alert-title>Feature not supported!</v-alert-title>
    Your CrateDB node does not support this feature, it is only available in >={{ version }}
  </v-alert>
</template>

<style scoped>

</style>
