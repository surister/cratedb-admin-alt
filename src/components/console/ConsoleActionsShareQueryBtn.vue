<script setup>
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {format_sql, query_to_markdown,} from "@/store/utils";
import {ref} from "vue";
import {use_console_store} from "@/store/console_store";
import {use_node_info_store} from "@/store/node_info";

const console_store = use_console_store()
const node_store = use_node_info_store()

const tab = ref()
const tabs = [
  {
    title: 'ALL - Markdown',
    needs_query_run: true,
    func: () => query_to_markdown(
      new Date().toISOString(),
      node_store.nodes.get_master_node().version.number,
      console_store.current_console.content,
      console_store.current_console.response.subtitle,
      console_store.current_console.response.data.headers,
      console_store.current_console.response.data.rows,
      15
    )
  },
  {
    title: 'Query - Markdown',
    needs_query_run: false,
    func: () => '```\n' + `${format_sql(console_store.current_console.content)}` + '\n```'
  }
]

</script>

<template>
  <button-with-dialog tooltip-text="Share query"
                      :remove-dialog-submit-btn="true"
                      dialog-title="Share your query"
                      activator-btn-icon="mdi-share-variant"
                      activator-btn-text=""
                      activator-btn-size="x-small"
                      activator-btn-variant="text"
                      activator-btn-color=""
                      :activator-btn-classes="['ml-1']">

    <template #dialog-content>
      <v-card-text>
        <v-tabs v-model="tab">
          <v-tab :value="tab.title" :key="i" v-for="(tab,i ) in tabs">{{ tab.title }}</v-tab>
        </v-tabs>

        <v-card-text>

          <v-window v-model="tab">

            <v-window-item :value="tab.title" v-for="(tab, i) in tabs" :key="i">

              <template v-if="tab.needs_query_run && !console_store.current_console.response.type">
                Query needs to be run first
              </template>

              <template v-else>
                <v-code tag="pre"
                        class="pa-4">
                  {{ tab.func() }}
                </v-code>
              </template>

            </v-window-item>

          </v-window>

        </v-card-text>
      </v-card-text>
    </template>

  </button-with-dialog>
</template>

<style scoped>

</style>
