<script setup>
import {use_log_store} from "@/store/log";

var getLocalStorageSize = function () {
  var total = 0;
  for (var x in localStorage) {
    // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
    var amount = (localStorage[x].length * 2) / 1024 / 1024;
    if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
      // console.log(x, localStorage.getItem(x), amount);
      total += amount;
    }
  }
  return total.toFixed(2);
};

const log_store = use_log_store()
let logs_length = 0
log_store.db.table('logs').toArray().then((res) => logs_length = res.length)
</script>

<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Open Dialog"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          <div>Current LocalStore size: {{ getLocalStorageSize() }}MiB</div>
          <div>Logs length: {{ logs_length }} entries</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Close Dialog"
              @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
