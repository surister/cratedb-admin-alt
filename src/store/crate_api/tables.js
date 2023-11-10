export class Schemas {
    schemas = []
    system_schemas = ['information_schema', 'pg_catalog', 'sys']

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

    constructor(data) {
        for (const row of data) {
            const schema_name = row[row.length - 1]
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
    is_view(){
        return this.table_type === 'VIEW'
    }
    constructor(name, records, size_bytes, shards, replicas, table_type, schema) {
        this.name = name
        this.records = records
        this.size_bytes = size_bytes
        this.shards = shards
        this.replicas = replicas
        this.table_type = table_type
        this.schema = schema // Schema always last, see queries.js comment on the query
    }
}
