<script setup>
import {computed} from "vue";

const props = defineProps({
  object: Object
})
const object_name = computed(()=>`Object[${Object.entries(props.object).length}]`)
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :text="object_name"></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card :title="object_name">
        <v-card-text>
          <v-code class="overflow-y-auto" tag="pre">
            {{ object }}
          </v-code>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
