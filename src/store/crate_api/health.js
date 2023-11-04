export class CrateTableHealths {
  table_healths = []

  constructor(data) {
    for (const datum of data) {
      let newTableHealth = new tableHealth(
          ...datum
      )
      this.table_healths.push(newTableHealth)
    }
  }

  is_empty(){
    return this.table_healths.length === 0
  }

  has_bad_health(){
    return this.get_bad_healths().length !== 0
  }
  get_bad_healths() {
    return this.table_healths.filter((tbl) => tbl.severity !== 1)
  }

  get_current_health_level() {
    // Gets the current 'max' health level, priority goes as: red > yellow > green
    // https://cratedb.com/docs/crate/reference/en/5.4/admin/system-information.html#health
    // We can just return the first one since the query that produces the data is ordered by severity
    // Meaning that the highest severity will decide the 'health'.
    return this.is_empty() ? 'UNKNOWN' : this.table_healths[0].health
  }
}

class tableHealth {
  constructor(health, missing_shards, partition_indents, severity, table_name, table_schema, under_replicated_shards) {
    this.health = health
    this.missing_shards = missing_shards
    this.partition_indents = partition_indents
    this.severity = severity
    this.table_name = table_name
    this.table_schema = table_schema
    this.under_replicated_shards = under_replicated_shards
  }
}
