<script setup>
import {use_console_store} from "@/store/console_store";
import {computed, ref} from "vue";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()

const show_search = ref(false)
const groups = ref([])

const current_page = ref(1)
const QUERIES_PER_PAGE = 15
const search = ref('')

function paginate(array, page_size, page_number) {
  return array.slice((page_number.value - 1) * page_size, page_number.value * page_size);
}

const queries = computed(() => {
  let queries = stored_preferences.console.query_history
  if (search.value !== null && show_search.value && groups.value.includes('history')) {
    // We try to reduce unnecessary filtering as much as possible.
    queries = filter(queries)
  }
  return paginate(queries, QUERIES_PER_PAGE, current_page)
})

const filter = (queries) => queries.filter((query) => {
  const regex = `^.*${search.value}`
  const match = query.query.match(regex)
  return match !== null
})
const is_history_opened = computed(() => groups.value.includes('history'))
</script>

<template>
<v-navigation-drawer location="right" v-model="console_store.history_drawer">
  <v-list v-model:opened="groups">
    <v-list-item>
      <v-row no-gutters>
        <v-label text="Queries"/>
        <v-spacer/>
        <v-btn icon="mdi-table-search"
               @click="show_search = !show_search"
               flat/>
      </v-row>
    </v-list-item>
    <v-divider/>
    <v-expand-transition>
      <v-text-field clearable
                    placeholder="Search table.."
                    :focused="true"
                    class="rounded-0"
                    v-model="search"
                    v-if="show_search"/>
    </v-expand-transition>
    <v-expand-transition>
      <div v-if="is_history_opened">
        <v-pagination v-model="current_page"
                      class="my-2"
                      total-visible="1"
                      :length="stored_preferences.console.query_history.length / QUERIES_PER_PAGE"
                      density="compact"/>
        <v-divider/>
      </div>
    </v-expand-transition>
    <v-list-group value="history">
      <template #activator="{ props }">
        <v-list-item v-bind="props">Query history</v-list-item>
      </template>
      <v-list-item link v-for="(query, i) in queries"
                   :key="i"
                   @click="console_store.current_console.content = query.query">
        <template #title>
          <v-tooltip :text="query.query">
            <template #default>
              <pre>{{ query.query }}</pre>
            </template>
            <template v-slot:activator="{ props }">
                <span v-bind="props" class="text-subtitle-2">
                  {{ query.query }}
                </span>
            </template>
          </v-tooltip>
        </template>
        <template #append>
          <v-btn icon="mdi-delete"
                 size="x-small"
                 flat
                 class="ml-1"
                 @click.stop="stored_preferences.delete_from_history(query)"/>
        </template>
      </v-list-item>
    </v-list-group>
    <v-list-group v-show="false">
      <template #activator="{ props }">
        <v-list-item v-bind="props">Saved queries</v-list-item>
      </template>

      <v-list-item link title="My query">
        <template #append>
          <v-btn icon="mdi-delete"
                 size="small"
                 flat/>
        </template>
      </v-list-item>
    </v-list-group>
  </v-list>
</v-navigation-drawer>
</template>

<style scoped>

</style>