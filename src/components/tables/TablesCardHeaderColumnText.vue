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

const formatted_value = () => {
  if (props.value == null) {
    return 'n/a'
  }
  if (Number.isInteger(props.value)) {
    // We format integers such as '100000' to '100 000' so they can be read easily.
    return props.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")
  }
  return props.value
}
</script>

<template>
  <v-col :cols="cols">
    <h2>{{ title }}</h2>
    <h3 class="pt-2">
      {{ formatted_value() }}
    </h3>
  </v-col>
</template>

<style scoped>

</style>
