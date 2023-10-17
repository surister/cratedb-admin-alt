import {defineStore} from "pinia";
import {reactive, toRefs, watch} from "vue";
import {requestCrate} from "@/store/http/requests";
import queries from "@/store/http/queries";
import {Schemas} from "@/store/crate_api/tables";
import {Columns} from "@/store/crate_api/columns";

export const use_tables_store = defineStore('tables', () => {
    const state = reactive({
        schemas: new Schemas([]),
        current_tab: '',
        current_open_table: null,
        current_open_table_columns: null,
        sample_data: null
    })

    async function update_tables() {
        const _response = await requestCrate(queries.TABLES)
        const tables = await _response.json()
        state.schemas = new Schemas(tables.rows)
    }

    async function update_table_schema_information(table_name, table_schema) {
        const _response = await requestCrate(queries.COLUMNS, null, {
            '%table_name': table_name,
            '%table_schema': table_schema
        })
        const columns = await _response.json()
        state.current_open_table_columns = new Columns(columns.rows)
    }

    async function update_table_sample_data() {
             const _response = await requestCrate(queries.SAMPLE_DATA, null, {
                 '%table_name': state.current_open_table.name,
                 '%table_schema': state.current_open_table.schema
             })
        const data = await _response.json()
        state.sample_data = data
    }

    watch(
        () => state.current_open_table, async (value) => {
            await update_table_schema_information(value.name, value.schema)
            console.log('whot')
            state.sample_data = null
            state.current_tab = 'one'
        }
    )
    return {
        ...toRefs(state), update_tables, update_table_sample_data
    }
})
