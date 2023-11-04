<script setup>
import {use_chart_store} from "@/store/charts";
import {computed, ref} from "vue";
import VueApexCharts from 'vue3-apexcharts'

const chart_store = use_chart_store()

const _chart = ref(null)

const data = computed(() => {
  return {
    series: [
      {
        name: 'Load 1',
        data: chart_store.load.load1,
      },
      {
        name: 'Load 5',
        data: chart_store.load.load5,
      },
      {
        name: 'Load 15',
        data: chart_store.load.load15,
      }
    ],
  }
})

const config = {
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
      dashArray: [0, 8, 5]
    },
    title: {
      text: 'Load',
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

setInterval(() => {
  // We reset the internal chart state every 1 minute to avoid possible memory leaks as
  // recommended by the documentation on hour-long sessions, this is technically
  // covered on our implementation (interval) but never hurts to extra careful.
  if (_chart.value != null) {
    _chart.value.resetSeries()
  }
}, 60000) // 1 minute
</script>

<template>
  <v-card class="pa-2">
    <div id="chart">
      <VueApexCharts
          ref="_chart"
          type="line"
          height="350"
          :options="config"
          :series="data.series">
      </VueApexCharts>
    </div>
  </v-card>
</template>

<style scoped>

</style>
