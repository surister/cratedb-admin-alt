<script setup>
import {computed, ref, watch} from "vue";
import {use_tables_store} from "@/store/tables";

const vector_store = use_vector_store()

const knn_search_options = ref({
  results: 10, // How many results will the knn return
  schema: 'doc',
  table: 'fs_vec_big2',
  vector_column_name: 'xs',
  openai_token: '',
  model_dimensions: 2048,
  model: 'text-embedding-3-large',
  text: 'scalar knn search',
  join_table_name: 'fs_search5',
  join_table_on: '_id',
  vec_join_table_on: 'fs_search_id',
  selects_from_join: '1'
})

const fs_search_options = ref({
  schema: 'doc',
  table: ['fs_search5'],
  multiple: false,
  column: 'content, title',
  text: 'scalar knn search',
  selected_fields: '*',
  results: []
})

const hybrid_search_options = ref({
  weights: .5,
  text: 'k-nearest neighbour search',
  fs_results: [],
  knn_results: []
})

const hybrid_search_weights_message = computed(() => {
  if (hybrid_search_options.value.weights === .5) {
    return 'Both weight the same, no method will have prevalence over the other.'
  }
  if (hybrid_search_options.value.weights < .5){
    return `Full text search will have added weight: (+ ${(.5 - hybrid_search_options.value.weights).toFixed(2)})`
  }
    if (hybrid_search_options.value.weights > .5){
    return `Vector search will have added weight: (+ ${(.5 - hybrid_search_options.value.weights).toFixed(2) * -1})`
  }
})
const query_result = ref(null);

const table_store = use_tables_store();

const schema_list = computed(() => table_store.schemas.schemas.filter((schema) => !schema.is_system))
const tables_list = computed(() => {
  const schema = schema_list.value.filter((schema) => schema.name === knn_search_options.value.schema)
  if (schema.length) {
    return schema_list.value.filter((schema) => schema.name === knn_search_options.value.schema)[0].tables.map((table) => table.name)
  }
  return []
})

import OpenAI from "openai";
import {use_vector_store} from "@/store/vectore_store";
import ConsoleResponse from "@/components/console/ConsoleResponse.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";

const openai = new OpenAI({
  apiKey: knn_search_options.value.openai_token,
  dangerouslyAllowBrowser: true
});

watch(() => knn_search_options.value.openai_token, () => openai.apiKey = knn_search_options.value.openai_token)

async function fs_search() {
  const results = await vector_store.fs_search(fs_search_options.value.table, fs_search_options.value.column, fs_search_options.value.text, fs_search_options.value.selected_fields)
  fs_search_options.value.results = []
  for (const result of results) {
    fs_search_options.value.results.push({
      headers: result.cols,
      rows: result.rows,
      extra_title: `Table: ${result.table_name}`
    })
  }
}

async function knn_search() {
  const embedding = await openai.embeddings.create({
    model: knn_search_options.value.model,
    input: knn_search_options.value.text,
    dimensions: parseInt(knn_search_options.value.model_dimensions)
  });
  const vector = embedding.data[0].embedding

  const results = await vector_store.knn_search_with_join(
    knn_search_options.value.table,
    knn_search_options.value.vector_column_name,
    vector,
    knn_search_options.value.results,
    knn_search_options.value.join_table_name,
    knn_search_options.value.join_table_on,
    knn_search_options.value.vec_join_table_on,
    knn_search_options.value.selects_from_join
  )

  query_result.value = {
    headers: results.cols,
    rows: results.rows
  }
}
const hybrid_search_results = ref()
async function hybrid_search() {
  const embedding = await openai.embeddings.create({
    model: knn_search_options.value.model,
    input: hybrid_search_options.value.text,
    dimensions: parseInt(knn_search_options.value.model_dimensions)
  });
  const vector = embedding.data[0].embedding

  const result = await vector_store.hybrid_search(
    fs_search_options.value.table,
    fs_search_options.value.column,
    hybrid_search_options.value.text,
    1,
    knn_search_options.value.table,
    knn_search_options.value.vector_column_name,
    vector,
    10
  )

  for (const resultElement of result.rows) {
    let vec_rank = resultElement[1] || 0;
    let fs_rank = resultElement[2] || 0;
    let final_rank = 0;
    for (const fsRankElement of [vec_rank, fs_rank]) {
      if (fsRankElement !== 0) {
        final_rank += 1 / (fsRankElement + 0)
      }
    }

    resultElement.push(
      final_rank
    )
  }
  let sorted = result.rows.sort((a, b) => {
    return  b[a.length - 1] - a[a.length - 1]
  })
  result.cols.push('final_weight')
  hybrid_search_results.value = {
    headers: result.cols,
    rows: sorted
  }
}
</script>

<template>
  <v-label>Full-Text search</v-label>
  <v-row class="pt-5">
    <v-col>
      <v-card class="border-sm">
        <v-card-title>
          Table(s)
        </v-card-title>
        <v-card-text>
          <v-select v-model="fs_search_options.schema"
                    :items="schema_list"
                    item-value="name"
                    item-title="name"
                    label="schema"/>
          <v-select v-model="fs_search_options.table"
                    :items="tables_list"
                    item-value="name"
                    item-title="name"
                    multiple
                    label="table"/>
          <v-checkbox label="Search in multiple tables"
                      v-model="fs_search_options.multiple"></v-checkbox>
          <v-text-field label="Search column name"
                        v-model="fs_search_options.column"></v-text-field>
          <v-text-field label="Selected fields (comma separated)"
                        v-model="fs_search_options.selected_fields"></v-text-field>
        </v-card-text>

      </v-card>
    </v-col>
    <v-col>
      <v-text-field v-model="fs_search_options.text" label="Text"></v-text-field>
    </v-col>
  </v-row>
  <v-btn variant="outlined" class="my-5" @click="fs_search">Search</v-btn>
  <template v-if="fs_search_options.results">
    <console-table-results class="border-sm" v-for="d in fs_search_options.results" :data="d"
                           :key="d" :extra_title="d.extra_title"></console-table-results>
  </template>

  <br>
  <v-divider></v-divider>
  <v-label class="mt-5">Knn Search</v-label>

  <v-row class="pt-5">
    <v-col>
      <v-card class="border-sm">
        <v-card-title>
          Query
        </v-card-title>
        <v-card-text>
          <v-text-field label="By text, e.g. 'How to do x'" v-model="knn_search_options.text"/>
          <v-text-field label="By vector, e. [0.232, 0.23, 0.42]"/>
          <v-text-field label="results"
                        type="number"
                        v-model="knn_search_options.results"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="border-sm">
        <v-card-title>Vector table</v-card-title>
        <v-card-text>
          <v-select v-model="knn_search_options.schema"
                    :items="schema_list"
                    item-value="name"
                    item-title="name"
                    label="schema"/>
          <v-select v-model="knn_search_options.table"
                    :items="tables_list"
                    item-value="name"
                    item-title="name"
                    label="table"/>
          <v-text-field v-model="knn_search_options.vector_column_name" label="Vector col name"/>
          <v-text-field v-model="knn_search_options.join_with"></v-text-field>
        </v-card-text>
      </v-card>

    </v-col>
    <v-col>
      <v-card class="border-sm">
        <v-card-title>Open AI</v-card-title>
        <v-card-text>
          <v-text-field v-model="knn_search_options.model" label="model"/>

          <v-text-field label="OpenAI Token" v-model="knn_search_options.openai_token"
                        type="password"
                        clearable/>
          <v-text-field label="Dimensions" type="integer"
                        v-model="knn_search_options.model_dimensions"></v-text-field>
        </v-card-text>

      </v-card>

    </v-col>
    <v-col>
      <v-card class="border-sm">
        <v-card-title>Join results to</v-card-title>
        <v-card-text>

          <v-select v-model="knn_search_options.join_table_name"
                    :items="tables_list"
                    item-value="name"
                    item-title="name"
                    label="table"/>
          <v-text-field v-model="knn_search_options.join_table_on" label="Join table on"/>
          <v-text-field v-model="knn_search_options.vec_join_table_on"
                        label="Vector, join table on"></v-text-field>
          <v-text-field label="Columns that will be selected from the join (the non vector table)"
                        v-model="knn_search_options.selects_from_join"></v-text-field>
        </v-card-text>

      </v-card>

    </v-col>
  </v-row>
  <v-btn @click="knn_search" class="my-5" variant="outlined">Search</v-btn>

  <template v-if="query_result">
    <console-table-results class="border-sm" :data="query_result"></console-table-results>
  </template>

  <v-divider/>
  <v-label class="mt-5">Hybrid Search</v-label>
  <v-row class="mt-5">
    <v-col>
      <v-card class="border-sm">
        <v-card-subtitle class="pa-5">
          For the vector search it reuses the <strong>Knn Search</strong> options above.<br>
          For the full-text search it reuses the <strong>Full-text search</strong> options above.
        </v-card-subtitle>
      </v-card>
      <v-text-field class="pt-4" label="Query" v-model="hybrid_search_options.text" ></v-text-field>
    </v-col>
    <v-col>
      <v-card class="border-sm">
        <v-card-title>
          Rank fusion (Reciprocal Rank Fusion)
        </v-card-title>
        <v-card-text>
          <v-slider min="0" max="1" v-model="hybrid_search_options.weights"
                    label="Weights fs / vector"></v-slider>
          {{ hybrid_search_weights_message }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-btn @click="hybrid_search">Search</v-btn>
  <console-table-results class="border-sm" :data="hybrid_search_results" v-if="hybrid_search_results"></console-table-results>

</template>

<style scoped>

</style>
