export default {
  NODE_INFO: "SELECT name, load, fs, heap, rest_url, version, os_info FROM SYS.NODES ORDER BY name",
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt = '%stmt'",
  KILL: "KILL '%id'",
  HEALTH: 'SELECT health, missing_shards, partition_ident, severity, table_name, table_schema, underreplicated_shards FROM SYS.HEALTH order by severity DESC',
  ALLOCATIONS: 'SELECT current_state, decisions, explanation, node_id, partition_ident, primary, shard_id, table_name, table_schema FROM SYS.ALLOCATIONS',
  NODE_CHECKS: 'SELECT id, node_id, severity, acknowledged, description FROM SYS.node_checks WHERE passed = false',
  JOBS: 'SELECT id, node, started, stmt, username FROM sys.jobs',
  // Gets the total amount of tables, user created tables get the rows of the primary
  // It also gets system schema tables such as information_schema, pg_catalog and sys.
  // IMPORTANT: In this query 'schema' always has to go last for values unpacking order reasons, see tables.js
  TABLES: `
    SELECT inf.table_name         as name,
           sha.records,
           sha.size_bytes,
           inf.number_of_replicas as replicas,
           inf.number_of_shards   as shards,
           inf.table_schema       as schema
    FROM (SELECT table_name,
                 schema_name,
                 SUM(size)     as size_bytes,
                 SUM(num_docs) as records
          FROM sys.shards sha
          WHERE sha.primary = true
          GROUP by table_name, schema_name) as sha RIGHT JOIN information_schema.tables inf
    ON inf.table_name = sha.table_name
    ORDER BY inf.table_schema
  `,
  // Gets the table SQL schema from the given %table and %schema
  COLUMNS: `SELECT ordinal_position, column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = '%table_name'
              and table_schema = '%table_schema'
            ORDER BY ordinal_position`,
  SAMPLE_DATA: `SELECT * FROM %table_schema.%table_name LIMIT 100`
}
