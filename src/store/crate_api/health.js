export class CrateTableHealths{
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
  getBadHealths (){
    return this.tableHealths.filter( (tbl) => tbl.severity !== 1)
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
