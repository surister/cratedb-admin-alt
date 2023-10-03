// Store that keeps the node info from CrateDB instances.

import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {requestCrate} from "@/store/http/requests";
import queries from "@/store/http/queries";

const REFRESH_EVERY_MS = 5000 // milliseconds
export const useNodeInfoStore = defineStore('nodeInfo',  () => {
  const state = reactive({
    load1: 'nan',
    load5: 'nan',
    load15: 'nan'
  })

  async function updateNodeInfo() {
    const nodeInfo = await requestCrate(queries.NODE_INFO)
    state.load1 = nodeInfo.rows[0][0]['1']
    state.load5 = nodeInfo.rows[0][0]['5']
    state.load15 = nodeInfo.rows[0][0]['15']
  }

  // We update it non-asynchronously
  updateNodeInfo()

  setInterval(async () => {
    await updateNodeInfo()
  }, REFRESH_EVERY_MS);
  return toRefs(state)
})
