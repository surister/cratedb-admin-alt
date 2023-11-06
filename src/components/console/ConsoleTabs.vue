<script setup>
import {ref} from "vue";
import {use_console_store} from "@/store/console_store";

const console_store = use_console_store()
const tab = ref(null)
</script>

<template>
    <v-tabs v-model="tab" density="comfortable" color="primary">
      <v-btn
        variant="text"
        height="100%"
        class="align-self-center"
        @click="console_store.consoles.push({content:'', name:`new_query(${console_store.consoles.length + 1})`})">
        New
        <v-icon end>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-tab
        class="border-e-sm"
        v-for="(con, i) in console_store.consoles"
        :key="i"
        :value="i + 1"
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
