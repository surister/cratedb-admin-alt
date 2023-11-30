export default {
  // OTHER
  KILL: "KILL '%id'",

  // SYSTEM INFORMATION
  NODE_INFO: "SELECT name, load, fs, heap, rest_url, version, os_info FROM SYS.NODES ORDER BY name",
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt LIKE '%stmt%'",
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
             partition_ident, primary, shard_id, table_name, table_schema
      FROM
          SYS.ALLOCATIONS
  `,
  NODE_CHECKS: 'SELECT id, node_id, severity, acknowledged, description FROM SYS.node_checks WHERE passed = false',
  JOBS: 'SELECT id, node, started, stmt, username FROM sys.jobs',
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

  // Repositories
  REPOSITORIES: `
      SELECT
        repos.name,
        repos.type,
        repos.settings,
        (
          SELECT
            ARRAY_AGG(
              {
                "name" = snaps.name,
                "state" = snaps.state,
                "concrete_indices" = snaps.concrete_indices,
                "failures" = snaps.failures,
                "started" = snaps.started,
                "finished" = snaps.finished,
                "table_partitions" = snaps.table_partitions,
                "tables" = snaps.tables,
                "version" = snaps.version
              }
            )
          FROM
            sys.snapshots snaps
          WHERE repos.name = snaps.repository
        ) as snapshots
      FROM
        sys.repositories repos
  `,
  DROP_REPOSITORY: `DROP REPOSITORY "%repository_name"`,
  CREATE_REPOSITORY: 'CREATE REPOSITORY "%repository_name" TYPE %type WITH (%options)',
  CREATE_SNAPSHOT: 'CREATE SNAPSHOT %repository_name %SQL_TABLE_STMT %tables WITH (wait_for_completion = %wait_for_completion, ignore_unavailable = %ignore_unavailable)',
  // USER QUERIES
  USERS: `
        SELECT
          usr.name,
          usr.superuser,
          (
            SELECT
              ARRAY_AGG(
                {
                  "class" = priv.class,
                  "grantor" = priv.grantor,
                  "ident" = priv.ident,
                  "state" = priv.state,
                  "type" = priv.type
                }
              )
            FROM
              sys.privileges priv
            WHERE
              priv.grantee = usr.name
          ) as privileges
        FROM
          sys.users usr
        ORDER BY
          usr.superuser DESC,
          usr.name ASC
  `,
  REVOKE: 'REVOKE %permission ON %type %ident FROM %to',
  DROP_USER: 'DROP USER %user_name',
  CURRENT_USER: 'SELECT current_user',
  CREATE_USER: "CREATE USER %username WITH (password='%password')",
  CREATE_USER_WITHOUT_PASSWORD: "CREATE USER %username",
  ALTER_USER: "ALTER USER %username SET (password = '%password')",

  // TABLE QUERIES
  TABLES: `
        WITH table_info AS (
          SELECT
            inf.table_name AS name,
            inf.table_schema AS schema,
            inf.number_of_replicas AS replicas,
            inf.number_of_shards AS shards,
            inf.table_type,
            sha.records,
            sha.size_bytes,
            he.health,
            he.missing_shards,
            he.partition_ident,
            he.severity,
            he.underreplicated_shards
          FROM information_schema.tables inf
            LEFT JOIN (
              SELECT
                table_name,
                schema_name,
                SUM(size) AS size_bytes,
                SUM(num_docs) AS records
              FROM sys.shards
              WHERE primary = true
              GROUP BY table_name, schema_name
            ) sha ON inf.table_name = sha.table_name
            LEFT JOIN sys.health he ON inf.table_name = he.table_name AND inf.table_schema = he.table_schema
        ),
        schema_with_tables AS (
          SELECT
            schemata.schema_name,
            COALESCE(
              NULLIF(ARRAY_AGG(
                CASE
                  WHEN ti.name IS NOT NULL THEN
                    {
                      "name" = ti.name,
                      "schema" = ti.schema,
                      "replicas" = ti.replicas,
                      "shards" = ti.shards,
                      "table_type" = ti.table_type,
                      "records" = ti.records,
                      "size_bytes" = ti.size_bytes,
                      "health" = ti.health,
                      "missing_shards" = ti.missing_shards,
                      "partition_ident" = ti.partition_ident,
                      "severity" = ti.severity,
                      "underreplicated_shards" = ti.underreplicated_shards
                    }
                  ELSE NULL
                END
              ), ARRAY[NULL])
            , ARRAY[]) AS tables
          FROM information_schema.schemata schemata
            LEFT JOIN table_info ti ON schemata.schema_name = ti.schema
          GROUP BY schemata.schema_name
        )
        SELECT *
        FROM schema_with_tables
        ORDER BY CASE
                     WHEN schema_name IN ('doc') THEN 0
                     WHEN schema_name IN ('sys', 'information_schema', 'pg_catalog', 'blob') THEN 2
                     ELSE 1
                     END,
                 schema_name;
  `,
  // Gets the total amount of tables, user created tables get the rows of the primary
  // It also gets system schema tables such as information_schema, pg_catalog and sys.
  // IMPORTANT: In this query 'schema' always has to go last for values unpacking order reasons, see tables.js
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
  SHOW_CREATE: `SHOW CREATE TABLE "%table_schema"."%table_name"`,
  RENAME_TABLE: `ALTER TABLE "%schema"."%old_table"
    RENAME TO "%new_table"`,
  DROP_COLUMN: 'ALTER TABLE "%table_schema"."%table_name" %drop_column_statements',
  DROP_TABLE: `
    DROP TABLE "%schema_name"."%table_name"
  `,
  DROP_VIEW: `
    DROP VIEW "%schema_name"."%table_name"`,
}
