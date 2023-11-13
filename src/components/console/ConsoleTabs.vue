<script setup>
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
</script>

<template>
  <v-tabs v-model="console_store.current_console_index" density="comfortable" color="primary">
    <v-btn height="100%"
           class="align-self-center rounded-0"
           @click="console_store.add_console"
           text="new"
           append-icon="mdi-plus"/>
    <v-tab class="border-e-sm"
           v-for="(con, i) in console_store.consoles"
           :key="i"
           :value="i"
           @click="console_store.current_console_index = i">
      <template #default>
        <v-row align="center">
          <v-col>{{ con.name }}</v-col>
          <v-col class="text-right px-0">
            <v-btn icon="mdi-close"
                   :disabled="i === 0"
                   size="x-small"
                   variant="text"
                   :ripple="false"
                   @click.stop="console_store.consoles.splice(i, 1)"/>
          </v-col>
        </v-row>
      </template>
    </v-tab>
  </v-tabs>
</template>

<style scoped>

</style>
