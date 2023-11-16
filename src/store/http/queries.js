export default {
  NODE_INFO: "SELECT name, load, fs, heap, rest_url, version, os_info FROM SYS.NODES ORDER BY name",
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt LIKE '%stmt%'",
  KILL: "KILL '%id'",
  HEALTH: `
    SELECT health,
           missing_shards,
           partition_ident,
           severity,
           table_name,
           table_schema,
           underreplicated_shards
    FROM SYS.HEALTH
    order by severity DESC
`,
  ALLOCATIONS: `
    SELECT current_state,
           decisions,
           explanation,
           node_id,
           partition_ident,
           primary,
           shard_id,
           table_name,
           table_schema
    FROM
      SYS.ALLOCATIONS
  `,
  NODE_CHECKS: 'SELECT id, node_id, severity, acknowledged, description FROM SYS.node_checks WHERE passed = false',
  JOBS: 'SELECT id, node, started, stmt, username FROM sys.jobs',
  // Gets the total amount of tables, user created tables get the rows of the primary
  // It also gets system schema tables such as information_schema, pg_catalog and sys.
  // IMPORTANT: In this query 'schema' always has to go last for values unpacking order reasons, see tables.js
  TABLES: `
      SELECT DISTINCT inf.table_name         as name,
                      inf.table_schema       as schema,
                      inf.number_of_replicas as replicas,
                      inf.number_of_shards   as shards,
                      inf.table_type,
                      sha.records,
                      sha.size_bytes,
                      he.health,
                      he.missing_shards,
                      he.partition_ident,
                      he.severity,
                      he.underreplicated_shards
      FROM (SELECT table_name,
                   schema_name,
                   SUM(size)     as size_bytes,
                   SUM(num_docs) as records
            FROM sys.shards sha
            WHERE sha.primary = true
            GROUP by table_name,
                     schema_name) as sha RIGHT JOIN information_schema.tables inf
      ON inf.table_name = sha.table_name
          FULL OUTER JOIN sys.health he ON inf.table_name = he.table_name
          AND inf.table_schema = he.table_schema
      ORDER BY
          shards, schema, table_type, name
  `,
  // Gets the table SQL schema from the given %table and %schema
  COLUMNS: `
    SELECT ordinal_position,
           column_name,
           data_type,
           is_nullable,
           column_default
    FROM information_schema.columns
    WHERE table_name = '%table_name'
      and table_schema = '%table_schema'
    ORDER BY ordinal_position
    `,
  SAMPLE_DATA: `
    SELECT *
    FROM "%table_schema"."%table_name"
    LIMIT 100
    `,
  QUERIES_PER_SECOND: `
    SELECT CURRENT_TIMESTAMP                                AS last_timestamp,
           (ended / 10000) * 10000 + 5000                   AS ended_time,
           COUNT(*) / 10.0                                  AS qps,
           TRUNC(AVG(ended::bigint - started::bigint), 2)   AS duration,
           UPPER(regexp_matches(stmt, '^\\s*(\\w+).*') [1]) AS query_type
    FROM sys.jobs_log
    WHERE ended > now() - ('15 minutes')::interval
    GROUP BY 1, 2, 5
    ORDER BY
      ended_time ASC
  `,
  DROP_TABLE: `
   DROP TABLE "%schema_name"."%table_name"
  `,
  DROP_VIEW:`
    DROP VIEW "%schema_name"."%table_name"`,
  USERS: `
    SELECT usr.name,
           usr.superuser,
           priv.class,
           priv.grantee,
           priv.grantor,
           priv.ident,
           priv.state,
           priv.type
    FROM sys.users usr
           LEFT JOIN sys.privileges priv ON usr.name = priv.grantee
    ORDER BY usr.superuser DESC , usr.name asc
  `,
  SHOW_CREATE: `SHOW CREATE TABLE "%table_schema"."%table_name"`,
  REVOKE: 'REVOKE %permission ON %type %ident FROM %to',
  DROP_USER: 'DROP USER %user_name',
  CURRENT_USER: 'SELECT current_user',
  CREATE_USER: "CREATE USER %username WITH (password='%password')",
  CREATE_USER_WITHOUT_PASSWORD: "CREATE USER %username",
  ALTER_USER: "ALTER USER %username SET (password = '%password')",
  RENAME_TABLE: `ALTER TABLE "%schema"."%old_table" RENAME TO "%new_table"`
}
