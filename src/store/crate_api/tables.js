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

  get_user_schemas(){
    return this.schemas.filter((schema) => !schema.is_system)
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
    return this.get_user_schemas().filter((table) => table.severity !== 1 && table.severity)
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

  get_total_records() {
    const schemas = this.get_user_schemas()
    return schemas.reduce((total, schema) => total + schema.get_total_records(), 0)
  }

  constructor(data) {
    for (const schema_data of data) {
      const schema_name = schema_data[0]
      const tables = schema_data[1]

      const is_system_schema = this.system_schemas.includes(schema_name)
      const new_schema = new Schema(schema_name, is_system_schema)

      for (const table of tables) {
        const new_table = new Table(...Object.values(table))
        new_schema.tables.push(new_table)
      }

      this.schemas.push(new_schema)
    }
  }
}

class Schema {
  tables = []

  get_size_bytes() {
    return this.tables.reduce((total, table) => total + table.total_size_bytes, 0)
  }

  get_total_records() {
    return this.tables.reduce((total, table) => total + table.total_records, 0)
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

  shard_count() {
    return this.shards ? this.shards.length : 0
  }

  constructor(name,
              schema,
              replicas,
              shards,
              partitions_health,
              overall_health,
              total_records,
              total_size_bytes,
              total_missing_shards,
              total_underreplicated_shards,
              table_type,
              partitioned_by,
              clustered_by,
              version
  ) {
    this.name = name
    this.schema = schema // Schema always second, see queries.js comment on the query
    this.replicas = replicas
    this.shards = shards
    this.partitions_health = partitions_health
    this.overall_health = overall_health
    this.total_records = parseInt(total_records)
    this.total_size_bytes = total_size_bytes
    this.total_missing_shards = total_missing_shards
    this.total_underreplicated_shards = total_underreplicated_shards
    this.table_type = table_type
    this.partitioned_by = partitioned_by
    this.clustered_by = clustered_by
    this.version = version
  }
}
