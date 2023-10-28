<script setup>

import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {useNodeInfoStore} from "@/store/nodeInfo";

const node_info_store = useNodeInfoStore()

let chart_config = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [4, 4, 4],
      curve: 'smooth',
      dashArray: [0, 0, 0]
    },
    title: {
      text: 'Query duration (ms)',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    xaxis: {
      tickAmount: 15,
      labels: {
        type: 'datetime',
        formatter: function (val) {
          return new Date(val).toLocaleTimeString()
        }
      }
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  }

const duration_data = computed(() => {
  return {
    series: [
      node_info_store.query_stats.to_chart_format_duration('SELECT'),
      node_info_store.query_stats.to_chart_format_duration('INSERT'),
      node_info_store.query_stats.to_chart_format_duration('UPDATE'),
      node_info_store.query_stats.to_chart_format_duration('DELETE'),
    ]
  }
})
</script>

<template>
  <v-card class="pa-2">
    <VueApexCharts
        type="line"
        height="350"
        :options="chart_config"
        :series="duration_data.series">
    </VueApexCharts>
  </v-card>
</template>

<style scoped>

</style>
