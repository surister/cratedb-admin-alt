<script setup>
import {use_global_store} from "@/store/global_store";
const global_store = use_global_store()
</script>

<template>
  <v-snackbar :timeout="global_store.snackbar_opts.duration_ms"
              :title="global_store.snackbar_opts.title"
              v-model="global_store.show_snackbar"
              :color="global_store.snackbar_opts.color"
              :location="global_store.snackbar_opts.location"
              style="margin-top: 100px">
    <div class="text-subtitle-1 pb-2">
      <v-icon>{{ global_store.snackbar_opts.icon }}</v-icon>
     <span class="ml-2">{{ global_store.snackbar_opts.title }}</span>
    </div>

    <p>{{ global_store.snackbar_opts.message }}</p>
  </v-snackbar>
</template>

<style scoped>

</style>
