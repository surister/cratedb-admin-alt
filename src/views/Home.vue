<script setup>
import LoadChart from "@/components/home/LoadChart.vue";
import QpsChart from "@/components/home/QpsChart.vue";
import DurationChart from "@/components/home/DurationChart.vue";
import {use_tables_store} from "@/store/tables";
import {computed} from "vue";
import {CRATE_HEALTH_LEGEND} from "@/store/crate_api/crate_lang";
import {separate_integer_by} from "@/store/utils";

const tables_store = use_tables_store()
const health = computed(() => tables_store.schemas.get_current_health_level())
</script>

<template>
<v-row>
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
</template>


