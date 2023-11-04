<script setup>
const props = defineProps({
  object: Object,
})
</script>

<template>
  <v-dialog min-width="500" max-width="800">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="View raw"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            <h2 class="font-weight-bold ml-4">
              Raw response for Object[{{ object.length }}]
            </h2>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-code class="overflow-y-auto" tag="pre">
            {{ object }}
          </v-code>
        </v-card-text>

        <v-divider/>
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
