<script setup>
import Markdown from 'vue3-markdown-it';

import ConsoleEditor from "@/components/console/ConsoleEditor.vue";
import ConsoleTableResults from "@/components/console/ConsoleTableResults.vue";
import {reactive, ref} from 'vue'
import {watchOnce} from '@vueuse/core'
import {use_notebooks_store} from "@/store/notebooks_store";

import {format_sql} from "@/store/utils";



const notebooks_store = use_notebooks_store()

const refs = reactive({})
const cells = ref([])

async function handle_enter_keypress(event, cell_index, cell_id) {
  if (cells.value.length === cell_index + 1) {
    // We are on the last cell
    if (notebooks_store.current_cell.content.length > 0) {
      await notebooks_store.run_cell(cell_index, null)
    }

    add_cell(cell_index)

    watchOnce(cells.value, () => {
      // We need to watch only once because it takes a few ms for the reactiveness of the ref cells
      // to trigger, so if we call change_focus right away, it will fail since cells still doesn't
      // have the new element, it's race condition that we circumvent by just changing the focus once
      // we detect the change.
      change_focus(cell_index + 1)
    })

  } else {
    if (notebooks_store.current_cell.content.length > 0) {
      // No need to pass the cell_id since we have current_focussed_cell to get the content from
      await notebooks_store.run_cell(cell_index, null)
    }
    change_focus(cell_index + 1)
  }
}

function handle_movement(e, from_text_area = false) {
  if (!from_text_area) {
    return
  }

  if (notebooks_store.current_notebook.cells.length > 1) {
    const cell_index = notebooks_store.current_notebook.current_focussed_cell_index
    const editor = get_editor(cell_index)

    if (e.keyCode === 38) {
      // KEYUP EVENT
      if (cell_index - 1 >= 0 // Check that there we do not go out of bounds, going one cell up when it doesn't exist doesn't make sense.
          && editor.getCursorPosition().row === 0  // Check that the current position is 0 (Line 0).
          && notebooks_store.current_cell.cursor_is_at_the_beginning // Check that we are at the beginning.

          // Is not enough to just check that the current position is 0, since getCursorPosition returns
          // after the key event, meaning that going from line 1 -> 0 returns the same value as going from
          // 0 -> 0, therefore we need to know when we are actually at the beginning.
      ) {
        change_focus(notebooks_store.current_notebook.current_focussed_cell_index - 1)
      }

      if (editor.getCursorPosition().row === 0) {
        if (
            !notebooks_store.current_cell.cursor_is_at_the_beginning
            // If we are on row 0 and not marked to be in the beginning, it's the first time we approach it
        ) {
          notebooks_store.current_cell.cursor_is_at_the_beginning = true
        }
      } else {
        notebooks_store.current_cell.cursor_is_at_the_beginning = false    // If the row is not 0 we are not at the beginning.
        if (editor.getCursorPosition().row !== editor.session.getLength() - 1) {
          // Also when going up, if we leave the last row (Last line) we mark as leaving the end.
          notebooks_store.current_cell.cursor_is_at_the_end = false
        }
      }
    }

    if (e.keyCode === 40) {
      // KEYDOWN EVENT
      if (
          cell_index + 1 <= cells.value.length - 1 // Check there is a cell below the current cell.
          && editor.getCursorPosition().row === editor.session.getLength() - 1  // Check we are on the last line.
          && notebooks_store.current_cell.cursor_is_at_the_end
      ) {
        change_focus(cell_index + 1)
      }

      if (editor.getCursorPosition().row === editor.session.getLength() - 1) {
        // Last line
        if (!notebooks_store.current_cell.cursor_is_at_the_end) {
          notebooks_store.current_cell.cursor_is_at_the_end = true
        }
      } else {
        notebooks_store.current_cell.cursor_is_at_the_end = false
        if (editor.getCursorPosition().row !== 0) {
          notebooks_store.current_cell.cursor_is_at_the_beginning = false
        }
      }
    }
  }
}

function add_cell(current_cell_index) {
  // By default, there is always one cell with id 0

  notebooks_store.current_notebook.last_created_cell_index += 1

  let new_cell = {
    id: notebooks_store.current_notebook.last_created_cell_index,
    name: `new_cell(${notebooks_store.current_notebook.last_created_cell_index})`,
    content: '',
    cursor_is_at_the_beginning: true,
    cursor_is_at_the_end: true,
    response: {
      type: null,
    }
  }
  notebooks_store.current_notebook.cells.splice(current_cell_index + 1, 0, new_cell)
}

function remove_cell(cell_index) {
  notebooks_store.current_notebook.cells.splice(cell_index, 1,)
}

function get_editor(cell_index) {
  return cells.value[cell_index].children[1].children[0].children[0].env.editor
}

function change_focus(cell_index) {
  get_editor(cell_index).textInput.getElement().focus()
}

function scroll_to(cell_index) {
  const element = cells.value[cell_index];
  const top = element.offsetTop - 300;
  window.scrollTo(0, top);
  change_focus(cell_index)
}

function clean_all_outputs(){
  for (const cell of notebooks_store.current_notebook.cells) {
    cell.response = {type: '',}
  }
}

const current_hovered_cell_index = ref(null)

// onBeforeMount(() => {
//   window.addEventListener('keydown', handle_movement)
//
// })
//
// onBeforeUnmount(() => {
//   window.removeEventListener('keydown', handle_movement)
// })


const show_traceback = ref(false)
const traceback_content = ref(null)

const opened = ref(['cells'])
</script>

<template>
  <v-navigation-drawer width="250">
    <v-row no-gutters class="pa-2">
      <v-col>

      </v-col>
      <v-col>

      </v-col>
      <v-col>
        <v-btn flat @click="notebooks_store.create_notebook">NEW +</v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-1"/>
    <v-list class="pa-0" v-model:opened="opened">
      <v-list-group fluid>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" link>
            Tutorials
          </v-list-item>
          <v-divider/>
        </template>
        <v-list-item link
                     :key="i"
                     v-for="(notebook, i) in notebooks_store.notebook_groups.tutorials"
                     @click="notebooks_store.notebook_groups.current_notebook_index = i; notebooks_store.selected_notebook_group = 'tutorials'"
                     :active="i === notebooks_store.notebook_groups.current_notebook_index && notebooks_store.selected_notebook_group === 'tutorials' ">

          <template #prepend>
            <v-icon class="mr-2">mdi-notebook-outline</v-icon>{{ notebook.name }}
          </template>

        </v-list-item>
      </v-list-group>
      <v-list-group fluid>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" link>
            Notebooks
          </v-list-item>
          <v-divider/>
        </template>
        <v-list-item link
                     :key="i"
                     v-for="(notebook, i) in notebooks_store.notebook_groups.my_notebooks"
                     @click="notebooks_store.notebook_groups.current_notebook_index = i; notebooks_store.selected_notebook_group = 'my_notebooks'"
                     :active="i === notebooks_store.notebook_groups.current_notebook_index && notebooks_store.selected_notebook_group === 'my_notebooks'">
          <template #prepend>
            <v-icon class="mr-2" color="primary">mdi-notebook</v-icon>
            {{ notebook.name }}
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-group value="cells" fluid>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" link>
            Cells
          </v-list-item>
          <v-divider/>
        </template>
        <v-list-item link
                     :key="i"
                     v-for="(cell, i) in notebooks_store.current_notebook.cells"
                     @click="scroll_to(cell.id)">
          <template #title>
            {{ cell.name }}
          </template>
          <template #prepend>
            <v-chip label size="small" color="primary" class="mr-2">{{
                cell.id
              }}
            </v-chip>
          </template>
          <template #append>
            <v-chip label>
              {{ cell.is_markdown ? 'md' : 'sql' }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-divider/>

  </v-navigation-drawer>
  <v-row>
    <v-col>
      <v-btn-group divided>
        <v-btn :disabled="true">Run all</v-btn>
        <v-btn @click="clean_all_outputs">Clean Output</v-btn>
        <v-btn :disabled="true">Share</v-btn>
        <v-btn :disabled="true">Output for Forum</v-btn>
      </v-btn-group>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h1>{{ notebooks_store.current_notebook.name }}</h1>
    </v-col>
  </v-row>
  <v-chip>Shift + Enter to run a cell</v-chip>
  <v-chip class="ml-1">Shift + R to reformat a cell</v-chip>
  <v-chip class="ml-1">We support markdown, start a line with '%md'</v-chip>

  <v-row class="pt-2">
    <v-col>
      <div v-for="(cell, i) in notebooks_store.current_notebook.cells"
           :key="i"
           ref="cells"
           class="px-4 mt-2"
           :class="[ notebooks_store.current_notebook.current_focussed_cell_index === i && !cell.is_markdown ? 'cell-focussed': 'cell' ]"
           @mouseenter="current_hovered_cell_index = i">
        <!--    @click="notebooks_store.current_notebook.current_focussed_cell_index !== i ? change_focus(i): ''"-->
        <template v-if="cell.is_markdown">
          <div @click="cell.is_markdown = false">
            <Markdown :source="cell.content.replace('%md', '')" :breaks="true"
                      :html="true"></Markdown>
          </div>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <v-text-field class="my-2" variant="plain" density="compact" single-line hide-details
                            v-model="cell.name"></v-text-field>
            </v-col>
            <v-col class="text-right"
                   v-if="current_hovered_cell_index === i || notebooks_store.current_notebook.current_focussed_cell_index === i">
              <v-row>
                <v-col>
                  <v-btn icon="mdi-play" :disabled="!cell.content.length"
                         variant="text"
                         size="small" color="green"
                         @click="notebooks_store.run_cell(i, cell.id)"/>
                  <v-btn icon="mdi-delete"
                         variant="text"
                         size="small"
                         color="red"
                         @click="remove_cell(i)"
                         :disabled="i === 0 && cells.length === 1"/>
                  <v-btn icon="mdi-table-row-plus-before"
                         variant="text"
                         size="small"
                        @click="add_cell(i - 1)"
                  />
                  <v-btn icon="mdi-table-row-plus-after"
                         variant="text"
                         size="small"
                         @click="add_cell(i)"
                  />

                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <console-editor
                  @keydown.shift.enter.prevent="(e) => handle_enter_keypress(e, i, cell.id)"
                  @keydown.up="(e) => handle_movement(e, true)"
                  @keydown.down="(e) => handle_movement(e, true)"
                  @keydown.shift.r.prevent="(_) => notebooks_store.current_cell.content = format_sql(notebooks_store.current_cell.content)"
                  @mouseover="refs[i] = false"
                  @focus="notebooks_store.current_notebook.current_focussed_cell_index = i"
                  @focusout="notebooks_store.current_notebook.current_focussed_cell_index = null"
                  :min-lines="1"
                  v-model:content="cell.content"/>
            </v-col>
          </v-row>
          <v-row class="mt-2" no-gutters>
            <v-col>
              <template v-if="notebooks_store.current_notebook.cells[i].is_running">
                <v-label>Running query
                  <v-progress-circular class="ml-2"
                                       :width="3"
                                       :size="18"
                                       color="primary"
                                       :indeterminate="true"/>
                </v-label>
              </template>


              <!-- The cell exists and there is a response-->
              <template
                  v-if="notebooks_store.current_notebook.cells[i] && notebooks_store.current_notebook.cells[i].response.type">

                <!-- Response is successful-->
                <template
                    v-if="notebooks_store.current_notebook.cells[i].response.type === 'success'">
                  <v-row no-gutters>
                    <v-col>
                      <v-label>
                        [crate]
                        <v-icon class="mx-1" color="success">mdi-check
                        </v-icon>
                        {{
                          notebooks_store.current_notebook.cells[i].response.label
                        }}
                      </v-label>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="pt-3">
                    <v-col>
                      <console-table-results
                          :data="notebooks_store.current_notebook.cells[i].response.data"/>
                    </v-col>
                  </v-row>
                </template>

                <!-- Response is an error-->
                <template v-else>
                  <span class="text-red font-weight-bold">Error</span>
                  <v-btn class="mx-2"
                         size="x-small"
                         text
                         @click="traceback_content = notebooks_store.current_notebook.cells[i].response.traceback; show_traceback = true">
                    show traceback
                  </v-btn>
                  <p class="text-wrap text-subtitle-2">
                    {{
                      notebooks_store.current_notebook.cells[i].response.label
                    }}</p>
                </template>
              </template>

            </v-col>
          </v-row>
        </template>
      </div>
    </v-col>
  </v-row>

  <!-- Reusable traceback dialog  -->
  <v-dialog width="70vw" v-model="show_traceback">

    <template v-slot:default="{ isActive }">
      <v-card title="Crate DB server traceback">
        <v-card-text>
          <v-code>
            {{ traceback_content }}
          </v-code>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn block
                 text="Close"
                 @click="isActive.value = false"/>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.cell {
  border: 1px solid transparent;
}

.cell:hover {
  border: 1px rgb(112, 111, 111) solid;
}

.cell-focussed {
  border: 1px #19c0ea solid !important;
}

.cell p {
  font-size: 20px !important;
}
</style>
