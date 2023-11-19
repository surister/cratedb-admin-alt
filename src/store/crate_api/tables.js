import {he} from "vuetify/locale";

export class Schemas {
    schemas = []
    system_schemas = ['information_schema', 'pg_catalog', 'sys']

    remove_table(table_to_delete) {
        for (const schema_ of this.schemas) {
            if (schema_.name === table_to_delete.schema) {
                const found_table = schema_.tables.filter((table) => table_to_delete.name === table.name)[0]
                const table_index = schema_.tables.indexOf(found_table)
                schema_.tables.splice(table_index, 1)
            }
        }
    }

    add_table(new_table, schema_name) {
        for (const _schema of this.schemas) {
            if (_schema.name === schema_name) {
                _schema.tables.push(new_table)
            }
        }
    }

    schema_exists(schema_name) {
        return this.schemas.filter((schema) => schema.name === schema_name).length === 1
    }

    get_all_tables(ignore_system_schemas = false) {
        let tables = []
        for (const schema of this.schemas) {
            if (ignore_system_schemas && schema.is_system) {
                break
            }
            tables.push(...schema.tables)
        }
        return tables
    }

    get_unhealthy_tables() {
        return this.get_all_tables(true).filter((table) => table.severity !== 1 && table.severity)
    }

    get_current_health_level() {
        const tables = this.get_all_tables()
        if (tables.length === 0) {
            // Fresh CrateDB server.
            return 'UNKNOWN'
        }

        const unhealthy_tables = tables.filter((table) => table.severity !== 1 && table.severity)

        if (unhealthy_tables.length !== 0) {
            // Unhealthy tables can only be RED or YELLOW, so if we see a RED, we can just return, otherwise we know it's yellow.
            for (const table of unhealthy_tables) {
                if (table.health === 'RED') {
                    return 'RED'
                }
            }
            return 'YELLOW'
        }
        return 'GREEN'
    }

    constructor(data) {
        for (const row of data) {
            const schema_name = row[1]
            const new_table = new Table(...row)

            if (!this.schema_exists(schema_name)) {
                const is_system_schema = this.system_schemas.includes(schema_name)
                const new_schema = new Schema(schema_name, is_system_schema)
                this.schemas.push(new_schema)
            }
            this.add_table(new_table, schema_name)
        }
    }
}

class Schema {
    tables = []

    get_size_bytes() {
        let s = 0
        for (const table of this.tables) {
            s += table.size_bytes
        }
        return s
    }

    constructor(name, is_system) {
        this.name = name
        this.is_system = is_system
    }
}

class Table {
    // We use the same Table object for Tables and Views, as View is almost like a table for our purposes,
    // it doesn't make sense to complicate the API with more stuff.
    is_view() {
        return this.table_type === 'VIEW'
    }

    constructor(name,
                schema,
                replicas,
                shards,
                table_type,
                records,
                size_bytes,
                health,
                missing_shards,
                partition_ident,
                severity,
                underreplicated_shards) {
        this.name = name
        this.schema = schema // Schema always second, see queries.js comment on the query
        this.replicas = replicas
        this.shards = shards
        this.table_type = table_type
        this.records = records
        this.size_bytes = size_bytes
        this.health = health
        this.missing_shards = missing_shards
        this.partition_ident = partition_ident
        this.severity = severity
        this.underreplicated_shards = underreplicated_shards
    }
}
