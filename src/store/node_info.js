// Store that keeps the node info from CrateDB instances.
import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";

import {request_crate} from "@/store/http/requests";
import queries from "@/store/http/queries";
import {use_chart_store} from "@/store/charts";
import {CrateNodes} from "@/store/crate_api/node";
import {CrateTableHealths} from "@/store/crate_api/health";
import {AllocationIssues} from "@/store/crate_api/allocations";
import {NodeChecks} from "@/store/crate_api/node_checks";
import {Jobs} from "@/store/crate_api/jobs";
import {QueryStats} from "@/store/crate_api/query_stats";
import {Users} from "@/store/crate_api/users";

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
export const use_node_info_store = defineStore('node_info', () => {
    const state = reactive({
        nodes: new CrateNodes([emptyNodeResult,], 1),
        health: new CrateTableHealths([]),
        allocations: new AllocationIssues([]),
        node_checks: new NodeChecks([]),
        jobs: new Jobs([]),
        query_stats: new QueryStats([]),
        users: new Users([]),
        should_update_allocation: false,
        node_count: '0',
        current_user: ''
    })

    const charts_store = use_chart_store()

    async function update_node_info() {
        const _response = await request_crate(queries.NODE_INFO)
        const data = await _response.json()
        state.nodes = new CrateNodes(data.rows, data.rowcount)
    }

    async function update_health_info() {
        const _response = await request_crate(queries.HEALTH)
        const data = await _response.json()
        state.health = new CrateTableHealths(data.rows)

        // If there is a bad health table, we start fetching allocation issues, otherwise
        // we can stop fetching it.
        state.should_update_allocation = !!state.health.has_bad_health();
    }

    async function update_allocations_info() {
        const _response = await request_crate(queries.ALLOCATIONS)
        const data = await _response.json()
        state.allocations = new AllocationIssues(data.rows)
    }

    async function update_node_checks() {
        const _response = await request_crate(queries.NODE_CHECKS)
        const data = await _response.json()
        state.node_checks = new NodeChecks(data.rows)
    }

    async function update_jobs_info() {
        const _response = await request_crate(queries.JOBS)
        const data = await _response.json()
        state.jobs = new Jobs(data.rows)
    }

    async function update_chart_load_data() {
        // Updates the lists that will be used in the charts with the latest
        // master node load 1, 5 and 15 data.
        const seconds_per_tick = (REFRESH_EVERY_MS / 1000)
        const current_ticks = charts_store.load.load1.length
        const max_interval_seconds = CHART_MAX_INTERVAL_S

        const {load1, load5, load15} = state.nodes.get_master_node().load

        if ([load1, load5, load15].some((val) => val === 'load')) {
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
        const _response = await request_crate(queries.QUERIES_PER_SECOND)
        const data = await _response.json()
        state.query_stats = new QueryStats(data.rows)
    }

    async function update_privileges() {
        //TODO Move this, pending the store refactor
        const _response = await request_crate(queries.USERS)
        const data = await _response.json()
        state.users = new Users(data.rows)
    }

    async function update_current_user() {
        const _response = await request_crate(queries.CURRENT_USER)
        const data = await _response.json()
        state.current_user = data.rows[0][0]
    }

    Promise.allSettled([
        update_node_info(),
        update_health_info(),
        update_node_checks(),
        update_jobs_info(),
        update_qps_data(),
        update_privileges(),
        update_current_user(),
    ])

    setInterval(async () => {
        // Be careful, this ignores exceptions.
        await Promise.allSettled([
                update_node_info(),
                update_health_info(),
                update_node_checks(),
                update_jobs_info(),
                update_chart_load_data(),
                update_qps_data(),
                update_privileges(),
            ],
        )
        if (state.should_update_allocation) {
            await update_allocations_info()
        }
    }, REFRESH_EVERY_MS);

    return {
        ...toRefs(state),
    }
})
