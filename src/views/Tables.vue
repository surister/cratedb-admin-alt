<script setup>
import TablesDrawer from "@/components/tables/TablesDrawer.vue";
import TableCard from "@/components/tables/TablesCard.vue";

import {use_tables_store} from "@/store/tables";
import {onBeforeMount} from "vue";
import ConsoleEditor from "@/components/console/ConsoleEditor.vue";

import {use_global_store} from "@/store/global_store";
import {request_crate} from "@/store/http/requests";

const tables_store = use_tables_store()
const global_store = use_global_store()

onBeforeMount(async () => {
  await tables_store.update_tables()
})

const queries = {
  CREATE_TABLE: `CREATE TABLE sensor_data (
    timestamp TIMESTAMP,
    temperature DOUBLE,
    humidity DOUBLE,
    pressure DOUBLE,
    inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
  INSERT: `INSERT INTO
  sensor_data (timestamp, temperature, humidity, pressure)
VALUES
  (CURRENT_TIMESTAMP, 25.5, 50.0, 1013.2),
  (CURRENT_TIMESTAMP + 10000, 26.0, 48.5, 1012.8),
  (CURRENT_TIMESTAMP + 20000, 24.8, 51.2, 1013.5);`
}

async function create_tutorial_table(){
  const response = await tables_store.create_table(queries.CREATE_TABLE)
  if (response.ok){
    global_store.show_successful_snackbar('Table created!')
  } else {
    const data = await response.json()
    global_store.show_error_snackbar(data.error.message)
  }
}

async function insert_data() {
  const response = await request_crate(queries.INSERT)
  if (response.ok) {
    global_store.show_successful_snackbar('Data inserted')
  } else {
    const data = await response.json()
    global_store.show_error_snackbar(data.error.message)
  }
}

</script>

<template>
  <tables-drawer/>
  <table-card v-if="tables_store.current_open_table"/>
  <span v-else>
    <v-row align-content="center"
           class="pt-4">
  <v-spacer/>
      <v-col cols="8">
        <h2>To get started on tables have a look at the documentation <a
            href="https://cratedb.com/docs/crate/reference/en/latest/general/ddl/index.html"
            target="_blank">here</a> or create your first table here:
        </h2>
        <v-card class="rounded-0 border-s-sm mt-4">
          <v-card-title>
            <console-editor style="outline: 1px solid #c2c2c2"
                            :content="queries.CREATE_TABLE"
                            :min-lines="1"
                            :read_only="true"
                            :unclickable="false"
                            :hide_cursor="true"/>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="create_tutorial_table">run</v-btn>
            <v-btn>copy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row align-content="center"
           class="pt-4">
  <v-spacer/>
    <v-col cols="8">
            <h2>Now let's add some data</h2>
      <v-card class="rounded-0 border-s-sm mt-4">
        <v-card-title>
          <console-editor style="outline: 1px solid #c2c2c2"
                          :content="queries.INSERT"
                          :min-lines="1"
                          :read_only="true"
                          :unclickable="false"
                          :hide_cursor="true"/>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="insert_data">run</v-btn>
          <v-btn>copy</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-spacer/>
  </v-row>
    <v-row>
    <v-spacer/>
    <v-col cols="8">
      <h2>Isn't this cool? Now explore the UI, you can do everything with the click of a button.</h2>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  </span>
</template>

<style scoped>

</style>
