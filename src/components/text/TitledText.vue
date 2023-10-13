<script setup>
const props = defineProps({
  title: String,
  text: String,

})
</script>

<template>
<p>{{ title }}: <strong>{{ text }}</strong></p>
</template>

<style scoped>

</style>
