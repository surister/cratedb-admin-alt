export default {
  // load
  NODE_INFO: "SELECT name, load, fs, heap, rest_url, version, os_info FROM SYS.NODES",
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt = '%stmt'",
  KILL: "KILL '%id'",
  HEALTH: 'SELECT health, missing_shards, partition_ident, severity, table_name, table_schema, underreplicated_shards FROM SYS.HEALTH order by severity DESC',
  ALLOCATIONS: 'SELECT current_state, decisions, explanation, node_id, partition_ident, primary, shard_id, table_name, table_schema FROM SYS.ALLOCATIONS',
  NODE_CHECKS: 'SELECT id, node_id, severity, acknowledged, description FROM SYS.node_checks WHERE passed = false'
}
