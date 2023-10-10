export default {
  // load
  NODE_INFO: 'SELECT name, load, fs, heap, rest_url FROM SYS.NODES',
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt = '%stmt'",
  KILL: "KILL '%id'",
  HEALTH: 'SELECT health, missing_shards, partition_ident, severity, table_name, table_schema, underreplicated_shards FROM SYS.HEALTH'
}
