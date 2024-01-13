<script setup>
import LoadChart from "@/components/home/LoadChart.vue";
import QpsChart from "@/components/home/QpsChart.vue";
import DurationChart from "@/components/home/DurationChart.vue";
import {use_tables_store} from "@/store/tables";
import {computed, ref} from "vue";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";
import {separate_integer_by} from "@/store/utils";
import Nodelist from "@/components/cluster/NodeTable.vue";

const tables_store = use_tables_store()
const health = computed(() => tables_store.schemas.get_current_health_level())

const tabs = ref()
</script>

<template>
  <v-row>
    <v-col>
      <v-label class="text-h4 font-weight-bold">Dashboard</v-label>
    </v-col>
  </v-row>

  <v-row class="mb-2">
    <v-col cols="4">
      <v-tabs v-model="tabs">
        <v-tab value="one">
          Overview
        </v-tab>
        <v-tab elevation="0"
               class="pa-4"
               value="two">
          Analytics
        </v-tab>
      </v-tabs>
    </v-col>
  </v-row>

  <v-window v-model="tabs">
    <v-window-item value="one" :transition="false">
      <v-row>
        <v-col cols="3">
          <v-card elevation="0" class="v-border-a pa-2" height="100">
            <v-card-title class="text-subtitle-1">Overall Health</v-card-title>
            <v-card-text class="font-weight-bold">
              <v-chip size="small"
                      label
                      class="ma-0"
                      :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="0" class="v-border-a pa-2" height="100">
            <v-card-title class="text-subtitle-1">Total Records</v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              {{ separate_integer_by(tables_store.schemas.get_total_records(), ' ') }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="0" class="v-border-a pa-2" height="100">
            <v-card-title class="text-subtitle-1">Schemas / Tables</v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              {{ tables_store.schemas.get_user_schemas().length }} /
              {{ tables_store.schemas.get_all_tables(true).length }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <nodelist></nodelist>
        </v-col>
      </v-row>
    </v-window-item>

    <v-window-item value="two" :transition="false">
      <v-row>
        <v-col>
          <load-chart/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <qps-chart/>
        </v-col>
        <v-col cols="6">
          <duration-chart/>
        </v-col>
      </v-row>
    </v-window-item>


  </v-window>


  <v-row v-if="false">
    <v-col>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="2">
              Overall Cluster health<br>
              <v-chip label
                      class="mt-2"
                      :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"/>
            </v-col>

            <v-col v-if="false">
              Replicated Data<br>
              <v-chip label
                      class="mt-2"
                      :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"/>
            </v-col>

            <v-col v-if="false">
              Available data<br>
              <v-chip label
                      class="mt-2"
                      :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"/>
            </v-col>

            <v-col cols="2">
              Total records<br>
              <v-chip label
                      class="mt-2"
                      :text="separate_integer_by(tables_store.schemas.get_total_records(), ' ')"/>
            </v-col>

            <v-col v-if="false">
              Under-replicated records<br>
              <v-chip label class="mt-2" :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"></v-chip>
            </v-col>

            <v-col v-if="false">
              Unavailable records<br>
              <v-chip label class="mt-2" :text="CRATE_HEALTH_LEGEND[health].short_description"
                      :color="health.toString().toLocaleLowerCase()"></v-chip>
            </v-col>

          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>


