// Store that keeps the node info from CrateDB instances.
import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";

import {requestCrate} from "@/store/http/requests";
import queries from "@/store/http/queries";
import {use_chart_store} from "@/store/charts";
import {CrateNodes} from "@/store/crate_api/node";
import {CrateTableHealths} from "@/store/crate_api/health";
import {AllocationIssues} from "@/store/crate_api/allocations";
import {NodeChecks} from "@/store/crate_api/node_checks";
import {Jobs} from "@/store/crate_api/jobs";
import {QueryStats} from "@/store/crate_api/query_stats";
import {Users} from "@/store/crate_api/users";
import {use_tables_store} from "@/store/tables";

const REFRESH_EVERY_MS = 5000 // milliseconds
const CHART_MAX_INTERVAL_S = 300 // 5 minutes in seconds.

// We need the emptyNodeResult as a 'default' value when the initial requests to populate data
// hasn't yet been completed, will usually only be on screen for .1-.2 seconds.
// Ideally we would have some 'loading' https://vuetifyjs.com/en/components/skeleton-loaders/
// or some initial general loading screen (since it'd only appear for .1s-.2s it'd be fine)
// But honestly, it's way easier to just create an empty json, the return for the effort is
// the most optimal FOR NOW.
const emptyNodeResult = [
  "load",
  {
    "1": 'load',
    "15": 'load',
    "5": 'load',
    "probe_timestamp": 'load'
  },
  {
    "disks": [{
      "available": 0,
      "used": 0,
      "dev": "load",
      "size": 0
    }],
    "data": [{"dev": "load", "path": "load"}],
    "total": {
      "bytes_written": 0,
      "size": 0,
      "available": 0,
      "reads": 0,
      "bytes_read": 0,
      "used": 0,
      "writes": 0
    }
  },
  {
    "used": 0,
    "free": 0,
    "max": 0,
    "probe_timestamp": 0
  },
  "load",
  {version: "version"}, // version
  {} // os info
]
export const useNodeInfoStore = defineStore('nodeInfo', () => {
    const state = reactive({
        nodes: new CrateNodes([emptyNodeResult,], 1),
        health: new CrateTableHealths([]),
        allocations: new AllocationIssues([]),
        node_checks: new NodeChecks([]),
        jobs: new Jobs([]),
        query_stats: new QueryStats([]),
        users: new Users([]),
        shouldUpdateAllocation: false,
        nodeCount: '0'
    })

    const charts_store = use_chart_store()

    async function updateNodeInfo() {
        const _response = await requestCrate(queries.NODE_INFO)
        const nodeInfo = await _response.json()
        state.nodes = new CrateNodes(nodeInfo.rows, nodeInfo.rowcount)
    }

    async function updateHealthInfo() {
        const _response = await requestCrate(queries.HEALTH)
        const healthInfo = await _response.json()
        state.health = new CrateTableHealths(healthInfo.rows)

        // If there is a bad health table, we start fetching allocation issues, otherwise
        // we can stop fetching it.
        state.shouldUpdateAllocation = !!state.health.hasBadHealth();
    }

    async function updateAllocationIssuesInfo() {
        const _response = await requestCrate(queries.ALLOCATIONS)
        const allocationInfo = await _response.json()
        state.allocations = new AllocationIssues(allocationInfo.rows)
    }

    async function updateNodeChecks() {
        const _response = await requestCrate(queries.NODE_CHECKS)
        const nodeChecksInfo = await _response.json()
        state.node_checks = new NodeChecks(nodeChecksInfo.rows)
    }

    async function updateJobsInfo() {
        const _response = await requestCrate(queries.JOBS)
        const jobs_info = await _response.json()
        state.jobs = new Jobs(jobs_info.rows)
    }

    async function update_chart_load_data() {
        // Updates the lists that will be used in the charts with the latest
        // master node load 1, 5 and 15 data.

        const seconds_per_tick = (REFRESH_EVERY_MS / 1000)
        const current_ticks = charts_store.load.load1.length
        const max_interval_seconds = CHART_MAX_INTERVAL_S

        const {load1, load5, load15} = state.nodes.getMasterNode().load

        if ([load1, load5, load15].some((val)=> val === 'load')){
          // If for some reason any load value is 'load' which is the default value
          // we do nothing.
          return
        }

        if (seconds_per_tick * current_ticks >= max_interval_seconds) {
            // We pop the first values so the interval is never bigger than CHART_MAX_INTERVAL_S
            charts_store.load.load1.shift()
            charts_store.load.load5.shift()
            charts_store.load.load15.shift()
        }

        const now = new Date()
        charts_store.load.load1.push(
            {
                y: load1,
                x: now
            }
        )
        charts_store.load.load5.push(
            {
                y: load5,
                x: now
            }
        )
        charts_store.load.load15.push(
            {
                y: load15,
                x: now
            }
        )
    }

    async function update_qps_data() {
        const _response = await requestCrate(queries.QUERIES_PER_SECOND)
        const qps = await _response.json()
        state.query_stats = new QueryStats(qps.rows)
    }

    async function update_privileges(){
        //TODO Move this, pending the store refactor
        const _response = await requestCrate(queries.USERS)
        const users = await _response.json()
        state.users = new Users(users.rows)
    }

    // We update them synchronously the first time we launch the site
    //
    // What happens if for some reason one fails and the others don't ?
    updateNodeInfo()
    updateHealthInfo()
    updateNodeChecks()
    updateJobsInfo()
    update_qps_data()
    update_privileges()
    setInterval(async () => {
        // Be careful, this ignores exceptions.
        await Promise.allSettled([
                updateNodeInfo(),
                updateHealthInfo(),
                updateNodeChecks(),
                updateJobsInfo(),
                update_chart_load_data(),
                update_qps_data(),
                update_privileges(),
            ],
        )
        if (state.shouldUpdateAllocation) {
            await updateAllocationIssuesInfo()
        }
    }, REFRESH_EVERY_MS);

    return {
        ...toRefs(state),
    }
})
