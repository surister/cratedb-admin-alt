<script setup>
import {use_console_store} from "@/store/console_store";
import {computed, ref} from "vue";
import {use_stored_preferences_store} from "@/store/storedPreferences";

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()

const show_search = ref(false)
const groups = ref(['history'])

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
<v-navigation-drawer location="right"
                     v-model="console_store.history_drawer">
  <v-list v-model:opened="groups">
    <v-list-item>

      <v-row no-gutters>

        <v-label text="Queries"/>

        <v-spacer/>

        <v-btn icon="mdi-table-search"
               size="small"
               @click="show_search = !show_search"
               flat/>

      </v-row>

    </v-list-item>

    <v-divider/>

    <v-expand-transition>
      <v-text-field clearable
                    rounded="0"
                    placeholder="Search query.."
                    :autofocus="true"
                    density="comfortable"
                    hide-details
                    variant="solo-filled"
                    v-model="search"
                    v-if="show_search"/>
    </v-expand-transition>

    <v-expand-transition>
        <v-pagination v-if="is_history_opened"
                      v-model="current_page"
                      class="my-2"
                      total-visible="1"
                      :length="stored_preferences.console.query_history.length / QUERIES_PER_PAGE"
                      density="compact"/>
        <v-divider/>

    </v-expand-transition>

    <v-list-group value="saved"
                  color="primary">

      <template #activator="{ props }">
        <v-list-item v-bind="props">Saved queries</v-list-item>
      </template>

      <v-list-item link v-for="query in stored_preferences.console.saved_queries"
                   :key="query.id"
                   @click="console_store.current_console.content = query.stmt">

        <template #title>

          <v-tooltip :text="query.stmt">

            <template #default>
              <pre>{{ query.stmt }}</pre>
            </template>

            <template v-slot:activator="{ props }">
                <span v-bind="props" class="text-subtitle-2">
                 {{ query.name }}
                </span>
            </template>

          </v-tooltip>

        </template>

        <template #append>
          <v-btn icon="mdi-delete"
                 size="x-small"
                 flat
                 class="ml-1"
                 @click.stop="stored_preferences.remove_saved_query(query.id)"/>
        </template>

      </v-list-item>

    </v-list-group>

    <v-list-group value="history"
                  color="primary" class="border-t-sm border-b-sm">

      <template #activator="{ props }">
        <v-list-item v-bind="props">Query history</v-list-item>
      </template>

      <v-list-item link
                   v-for="(query, i) in queries"
                   :key="i"
                   @click="console_store.current_console.content = query.query"
                   class="border-t-sm">
        <template #title>

          <v-tooltip>

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
                 @click.stop="stored_preferences.delete_from_history(query.id)"/>
        </template>

      </v-list-item>

    </v-list-group>
  </v-list>
</v-navigation-drawer>
</template>

<style scoped>

</style>
