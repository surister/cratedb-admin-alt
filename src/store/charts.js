import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";

export const use_chart_store = defineStore('chart', () => {
  const state = reactive({
    load: {
      load1: [],
      load5: [],
      load15: [],
    },
    qps: []
  })

  return {
    ...toRefs(state),
  }
})
