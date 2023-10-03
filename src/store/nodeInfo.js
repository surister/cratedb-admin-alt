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
    load15: 'nan',

    nodeCount: '0'
  })

  async function updateNodeInfo() {
    const _response = await requestCrate(queries.NODE_INFO)
    const nodeInfo = await _response.json()
    state.load1 = nodeInfo.rows[0][0]['1']
    state.load5 = nodeInfo.rows[0][0]['5']
    state.load15 = nodeInfo.rows[0][0]['15']
    state.nodeCount = nodeInfo.rowcount
  }

  // We update it non-asynchronously
  updateNodeInfo()

  setInterval(async () => {
    await updateNodeInfo()
  }, REFRESH_EVERY_MS);
  return toRefs(state)
})
