<script setup>
import {is_array, is_object} from "@/store/utils";

const props = defineProps({object: Object, type: String})
</script>

<template>
<span class="d-inline-block my-3">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title expand-icon="">
          <template v-if="type == 'array'">
            Array [{{ object.length }}]
          </template>
          <template v-else>
            Object [1]
          </template>
          <template v-slot:actions="{ expanded }"></template>
        </v-expansion-panel-title>
        <v-expansion-panel-text v-if="is_array" style="max-height: 200px" class="overflow-y-auto">[
                       <template v-for="k in object" :key="k">
                          <template v-if="is_object(k)">
                            <collapsible-text :object="k"></collapsible-text>,
                          </template>
                         <template v-else>{{ k }}, </template>
                       </template>
          ]
        </v-expansion-panel-text>
        <v-expansion-panel-text class="overflow-x-auto" v-else>
          {
          <template v-for="entry in Object.entries(object)" :key="entry">
            <template
              v-if="is_object(entry[1])">
              <span><strong>{{ entry[0] }}</strong>: <collapsible-text
                :object="entry[1]"></collapsible-text></span>
            </template>
            <template
              v-else-if="is_array(entry[1])">
              <p>array: <collapsible-text :object="entry[1]" type="array"></collapsible-text></p>
            </template>
            <template v-else>
              <p><strong>{{ entry[0] }}</strong>: {{ entry[1] }},</p>
            </template>
          </template>
          }
        </v-expansion-panel-text>
      </v-expansion-panel>
  </v-expansion-panels>
</span>
</template>

<style scoped>
.v-expansion-panel-title, .v-expansion-panel-title--active {
  padding: 8px 12px;
}
</style>
