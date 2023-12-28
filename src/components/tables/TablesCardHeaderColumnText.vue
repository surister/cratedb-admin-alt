<script setup>
import {separate_integer_by} from "@/store/utils";

const props = defineProps({
  title: String,
  value: {
    default: null,
    type: [String, Number],
    required: false
  },
  color: {
    type: String
  }
})

const formatted_value = () => {
  if (props.value == null) {
    return 'n/a'
  }
  if (Number.isInteger(props.value)) {
    // We format integers such as '100000' to '100 000' so they can be read easily.
    return separate_integer_by(props.value, ' ')
  }
  return props.value
}
</script>

<template>
  <v-col>
    <h3>{{ title }}</h3>
    <v-label :style="{ 'font-size': 20 + 'px', 'color': color}">
    {{ formatted_value() }}
    </v-label>
  </v-col>
</template>

<style scoped>

</style>
