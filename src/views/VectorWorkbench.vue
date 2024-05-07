<script setup>
import {computed, ref, watch} from "vue";
import {use_tables_store} from "@/store/tables";

const vector_store = use_vector_store()

const options = ref({
  results: 10, // How many results will the knn return
  schema: 'doc',
  table: 'fs_vec',
  vector_column_name: 'xs',
  openai_token: '',
  model: 'text-embedding-3-small',
  text: 'scalar knn search',
  extra_fields: null,
  join_with: ''
})

const query_result = ref(null);

const table_store = use_tables_store();

const schema_list = computed(() => table_store.schemas.schemas.filter((schema) => !schema.is_system))
const tables_list = computed(() => {
  const schema = schema_list.value.filter((schema) => schema.name === options.value.schema)
  if (schema.length) {
    return schema_list.value.filter((schema) => schema.name === options.value.schema)[0].tables.map((table) => table.name)
  }
  return []
})

import OpenAI from "openai";
import {use_vector_store} from "@/store/vectore_store";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";

const openai = new OpenAI({ apiKey: options.value.openai_token, dangerouslyAllowBrowser: true  });

watch(() => options.value.openai_token, () => openai.apiKey = options.value.openai_token)

async function search() {
  const embedding = await openai.embeddings.create({
    model: options.value.model,
    input: options.value.text,
  });
  const vectors = embedding.data[0].embedding
  const results = await vector_store.knn_search(options.value.extra_fields, options.value.table, options.value.vector_column_name, vectors, options.value.results)
  query_result.value = {
    headers: results.cols,
    rows: results.rows
  }
}
</script>

<template>
  <v-label>Knn Search</v-label>

  <v-row class="pt-5">
    <v-col>
      <v-card class="border-sm">
        <v-card-title>
          Query
        </v-card-title>
        <v-card-text>
          <v-text-field label="By text, e.g. 'How to do x'" v-model="options.text"/>
          <v-text-field label="By vector, e. [0.232, 0.23, 0.42]"/>
          <v-text-field label="Extra fields" v-model="options.extra_fields"/>
          <v-text-field label="results"
                        type="number"
                        v-model="options.results"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="border-sm">
        <v-card-title>Vector table</v-card-title>
        <v-card-text>
          <v-select v-model="options.schema"
                    :items="schema_list"
                    item-value="name"
                    item-title="name"
                    label="schema"/>
          <v-select v-model="options.table"
                    :items="tables_list"
                    item-value="name"
                    item-title="name"
                    label="table"/>
          <v-text-field v-model="options.vector_column_name" label="Vector col name"/>
          <v-text-field v-model="options.join_with"></v-text-field>
        </v-card-text>
      </v-card>

    </v-col>
    <v-col cols="4">
      <v-card class="border-sm">
        <v-card-title>Open AI</v-card-title>
        <v-card-text>
          <v-text-field v-model="options.model" label="model"/>

          <v-text-field label="OpenAI Token" v-model="options.openai_token" type="password"
                        clearable/>
        </v-card-text>

      </v-card>

    </v-col>

  </v-row>
  <v-btn @click="search" class="my-2" variant="outlined">Search</v-btn>

  <template v-if="query_result">
    <console-table-results class="border-sm" :data="query_result"></console-table-results>
  </template>

</template>

<style scoped>

</style>
