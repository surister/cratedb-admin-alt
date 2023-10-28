<template>
  <v-row>
    <v-col>
      <h1>Overview</h1>
    </v-col>
  </v-row>
  <span v-if="false">
    <v-row>
    <v-spacer></v-spacer>
    <v-col>
      <v-label class="pt-10"><h1>Welcome to CrateDB's alternative Panel (name pending)</h1>
      </v-label>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  <v-row class="text-center pt-5">
    <v-spacer></v-spacer>
    <v-col>
      <v-sheet class="pa-2" style="min-width: 70vh;">
        <h2 class="mt-4">As of now we support, fix or add:</h2>
        <v-list class="text-left" lines="one">
          <template v-for="(item, i) in features" :key="i">
            <v-list-item :href="item.link">{{ i }}.
              {{ item.text }}
              <template v-if="item.icon">
                <v-icon class="pl-1" :icon="item.icon"></v-icon>
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-sheet>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</span>
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

<script setup>
import LoadChart from "@/components/home/charts/LoadChart.vue";
import QpsChart from "@/components/home/charts/QpsChart.vue";
import DurationChart from "@/components/home/charts/DurationChart.vue";

const features = [
  {text: 'Customizable settings: theme, console sizes and master node url'},
  {
    text: 'Improved visibility of shard allocation issues',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/799'
  },
  {
    text: 'Better awareness of health',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/679'
  },
  {text: 'Better user notification when the panel cannot connect to the node (network issues)'},
  {
    text: 'Button to cancel current running query',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/811'
  },
  {text: 'Query history component that allows to add, remove and re-use past queries'},
  {
    text: 'Console shows line number',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/813'
  },
  {
    text: 'Show live jobs updates',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/675'
  },
  {
    text: 'Query watcher, adds the ability to automatically call the same query every 5seconds'
  },
  {text: 'Better and more visible support button with links to, forum, Github, SO, Documentation...'},

  {
    text: 'Better cluster view',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/732'
  },
  {
    text: 'Clear history now requires confirmation',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/574'
  },
  {
    text: 'Bring back light theme',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/709'
  },
  {
    text: 'Improved visuals for table view',
  },
  {
    text: 'Table view now shows more info about schema/table sizes',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/655'
  },
  {
    text: 'Add all the system schemas',
    icon: 'mdi-github',
    link: 'https://github.com/crate/crate-admin/issues/735'
  },
  {
    text: 'More features for table view such as:  SQL columns view with filtering, Sample data view with filtering'
  }
]
</script>
