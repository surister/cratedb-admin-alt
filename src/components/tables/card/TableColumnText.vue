<script setup>
const props = defineProps({
  cols: {
    type: Number,
    required: false
  },
  title: String,
  value: {
    default: null,
    type: [String, Number],
    required: false
  },
})
</script>

<template>
  <v-col :cols="cols">
    <h2>{{ title }}</h2>
    <h3 class="pt-2">
      {{ value === null ? 'n/a' : value }}
    </h3>
  </v-col>
</template>

<style scoped>

</style>
