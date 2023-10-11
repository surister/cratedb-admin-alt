export class CrateTableHealths {
  tableHealths = []

  constructor(data) {
    for (const rawHealthData of data) {
      let newTableHealth = new tableHealth(
        rawHealthData[0],
        rawHealthData[1],
        rawHealthData[2],
        rawHealthData[3],
        rawHealthData[4],
        rawHealthData[5],
        rawHealthData[6]
      )
      this.tableHealths.push(newTableHealth)
    }
  }

  isEmpty(){
    return this.tableHealths.length === 0
  }

  hasBadHealth(){
    return this.getBadHealths().length !== 0
  }
  getBadHealths() {
    return this.tableHealths.filter((tbl) => tbl.severity !== 1)
  }

  getHealthLevel() {
    // Gets the current 'max' health level, priority goes as: red > yellow > green
    // https://cratedb.com/docs/crate/reference/en/5.4/admin/system-information.html#health
    // We can just return the first one since the query that produces the data is ordered by severity
    // Meaning that the highest severity will decide the 'health' marker.
    if (this.isEmpty()){
      return ''
    }
    return this.tableHealths[0]
  }
}

class tableHealth {
  constructor(health, missingShards, partitionIndents, severity, tableName, tableSchema, underReplicatedShards) {
    this.health = health
    this.missingShards = missingShards
    this.partitionIndents = partitionIndents
    this.severity = severity
    this.tableName = tableName
    this.tableSchema = tableSchema
    this.underReplicatedShards = underReplicatedShards
  }
}
