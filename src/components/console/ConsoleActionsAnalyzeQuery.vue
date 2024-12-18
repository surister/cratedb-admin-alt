<script setup>

import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {use_console_store} from "@/store/console_store";
import ConsoleEditorReadOnly from "@/components/console/ConsoleEditorReadOnly.vue";
import {MarkerType, useVueFlow, VueFlow} from "@vue-flow/core";
import {ref} from "vue";
import {Background} from "@vue-flow/background";
import {MiniMap} from "@vue-flow/minimap";
import {ControlButton, Controls} from "@vue-flow/controls";

const console_store = use_console_store()

Object.defineProperties(Array.prototype, {
  count: {
    value: function (query) {
      /*
         Counts number of occurrences of query in array, an integer >= 0
         Uses the javascript == notion of equality.
      */
      var count = 0;
      for (let i = 0; i < this.length; i++)
        if (this[i] == query)
          count++;
      return count;
    }
  }
});

function extract_leafs(text) {
  let leafs = [];

  for (const [index, leaf] of text.split("\n").entries()) {
    if (leaf !== '') {
      leafs.push(new Leaf(leaf, null, null, index))
    }
  }
  return leafs
}

class Leaf {
  constructor(text, parent, children, id) {
    this.text = text;
    this.parent = parent;
    this.children = children ? children : []
    this.id = id

    const parts = this._extract_parts(text);

    if (!parts || parts.length < 2) {
      throw new Error("Invalid parts returned from _extract_parts");
    }

    [this.separators, this.name] = parts;
  }

  _extract_parts(text) {
    const allowed_separators = ['└', '├', '│',]
    let separators = []
    let last_sep_i = null
    for (const [index, char] of [...text].entries()) {
      if (allowed_separators.includes(char)) {
        last_sep_i = index
        separators.push(char)
      }
      if (char === '[') {
        last_sep_i ? last_sep_i += 2 : last_sep_i = 0
        return [separators, text.substring(last_sep_i, index)]
      }
    }
  }

  add_child(child) {
    child.parent = this;
    this.children.push(child);
  }
}


function adopt_leaves(leaves) {
  let leaf_divergence = [];
  let previous_leaf = null;

  for (const [index, leaf] of leaves.entries()) {
    if (index !== 0) {
      previous_leaf = leaves[index - 1]
    }
    if (leaf.separators.includes('└')) {
      if (
        previous_leaf !== null &&
        (previous_leaf.separators.count('│') === leaf_divergence.length) &&
        (leaf.separators.count('│') === leaf_divergence.length - 1) &&
        leaf_divergence.length !== 0
      ) {
        let divergent_leaf = leaf_divergence.splice(leaf_divergence.length - 1, 1)[0]
        divergent_leaf.add_child(leaf)

      } else {
        previous_leaf.add_child(leaf)
      }
    }
    if (leaf.separators.includes('├')) {
      previous_leaf.add_child(leaf)
      leaf_divergence.push(leaf)
    }
  }
}



//

const {onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, fitView} = useVueFlow()

const nodes = ref([])
const edges = ref([])

function prepare_nodes(leafb, x = 0, y = 70, depth = 1) {
  y = 70 * depth
  nodes.value.push(
    {
      id: leafb.id.toString(),
      data: {label: `${leafb.name} - ${leafb.id}`},
      position: {x: x, y: y},
      class: 'light'
    }
  )

  let parent = leafb.parent

  if (parent !== null) {
    edges.value.push({
      id: `e${leafb.parent.id}-${leafb.id}`,
      source: leafb.parent.id.toString(),
      target: leafb.id.toString(),
      markerEnd: MarkerType.ArrowClosed,
    })
  }

  for (const [i, leaf] of leafb.children.entries()) {
    if (leafb.children.length !== 1) {
      if (i === 0) {
        x += -200

      } else {
        x += 200 * (i + 1)

      }
    }
    prepare_nodes(leaf, x, y, depth += 1)
  }
}

const dark = ref(true)

onInit((vueFlowInstance) => {
  // instance is the same as the return of useVueFlow
  vueFlowInstance.fitView()
})


onNodeDragStop(({event, nodes, node}) => {
  console.log('Node Drag Stop', {event, nodes, node})
})


onConnect((connection) => {
  addEdges(connection)
})

function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject())
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({x: 0, y: 0, zoom: 1})
}

function toggleDarkMode() {
  dark.value = !dark.value
}
</script>

<template>
  <button-with-dialog tooltip-text="Analyze query"
                      activator-btn-text=""
                      activator-btn-size="x-small"
                      activator-btn-variant="text"
                      activator-btn-color="blue"
                      activator-btn-icon="mdi-sine-wave"
                      dialog-submit-btn-color="blue"
                      dialog-submit-btn-text="EXPLAIN"
                      :activator-btn-classes="['ml-1']"
                      dialogResponseComponent="snackbar"
                      :submit-callback="()=>console_store.explain_query()"
                      @on-response="(data) => {
                        nodes = []
                        edges = []
                        let leafsh = extract_leafs(data.data.rows[0][0])
                        adopt_leaves(leafsh)
                        prepare_nodes(leafsh[0])
                      }"
                      dialog-width="95vw">
    <template #dialog-content>
      <v-container fluid height="100vh">
        <v-row class="fill-height">
          <v-col cols="4">
            <console-editor-read-only :show_copy="false"
                                      :content="console_store.current_console.content"/>
          </v-col>
          <v-col height="85vh">
            <VueFlow
              :nodes="nodes"
              :edges="edges"
              :class="{ dark }"
              class="basic-flow"
              :default-viewport="{ zoom: 1.5 }"
              :min-zoom="0.2"
              :max-zoom="4"
            >
              <Background pattern-color="#fff" :gap="16"/>

              <MiniMap/>

              <Controls position="top-left">
                <ControlButton title="Reset Transform" @click="resetTransform">
                  <v-icon size="xs-sall">mdi-home</v-icon>
                </ControlButton>

                <ControlButton title="Shuffle Node Positions" @click="updatePos">
                  <v-icon size="xs-small">mdi-update</v-icon>
                </ControlButton>

                <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
                  <v-icon v-if="dark" name="mdi-theme-light-dark"/>
                  <v-icon v-else name="moon"/>
                </ControlButton>

                <ControlButton title="Log toObject" @click="logToObject">
                  <v-icon name="log"/>
                </ControlButton>
              </Controls>
            </VueFlow>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </button-with-dialog>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.0/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.0/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.basic-flow.dark {
    background:#2d3748;
    color:#fffffb
}

.basic-flow.dark .vue-flow__node {
    background:#4a5568;
    color:#fffffb
}

.basic-flow.dark .vue-flow__node.selected {
    background:#333;
    box-shadow:0 0 0 2px #2563eb
}

.basic-flow .vue-flow__controls {
    display:flex;
    flex-wrap:wrap;
    justify-content:center
}

.basic-flow.dark .vue-flow__controls {
    border:1px solid #FFFFFB
}

.basic-flow .vue-flow_controls .vue-flow_controls-button {
    border:none;
    border-right:1px solid #eee
}

.basic-flow .vue-flow_controls .vue-flow_controls-button svg {
    height:100%;
    width:100%
}

.basic-flow.dark .vue-flow_controls .vue-flow_controls-button {
    background:#333;
    fill:#fffffb;
    border:none
}

.basic-flow.dark .vue-flow_controls .vue-flow_controls-button:hover {
    background:#4d4d4d
}

.basic-flow.dark .vue-flow__edge-textbg {
    fill:#292524
}

.basic-flow.dark .vue-flow__edge-text {
    fill:#fffffb
}
</style>
