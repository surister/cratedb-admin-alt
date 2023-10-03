<script setup>
const props = defineProps({
  preprendIcon: String,
  appendIcon: String,
  title: String,
  linkTitle: String,
  linkTo: String,
})
</script>

<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-icon :icon="preprendIcon"></v-icon>
      <v-label class="ml-4">{{ title }}</v-label>
    </template>

    <template v-slot:append>
      <v-btn
        :href="linkTo"
        color="grey-darken-1"
        :append-icon="appendIcon"
        variant="text">
        {{ linkTitle }}
      </v-btn>
    </template>
  </v-list-item>
</template>

<style scoped>

</style>
