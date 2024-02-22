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
  DROP_SNAPSHOT: 'DROP SNAPSHOT "%repository_name"."%snapshot_name"',

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
      WITH partitions_health AS (
        SELECT
          table_name,
          table_schema,
          SUM(underreplicated_shards) as total_underreplicated_shards,
          SUM(missing_shards) as total_missing_shards,
          ARRAY_AGG(
            {
              "health" = health,
              "missing_shards" = missing_shards,
              "partition_ident" = partition_ident,
              "severity" = severity,
              "underreplicated_shards" = underreplicated_shards
            }
          ) AS partitions_health,
          CASE WHEN 'RED' = ANY(ARRAY_AGG(health)) then 'RED' WHEN 'YELLOW' = ANY(ARRAY_AGG(health)) then 'YELLOW' ELSE 'GREEN' END AS overall_health
        FROM
          sys.health
        GROUP BY
          table_name,
          table_schema
      ),
      shards AS (
        SELECT
          table_name,
          schema_name as table_schema,
          SUM(num_docs) as total_records,
          SUM(size) as total_size_bytes,
          ARRAY_AGG(
            {
              "id" = id,
              "partition_ident" = partition_ident,
              "records" = num_docs,
              "size_bytes" = size,
              "primary" = primary
            }
          ) as shards
        FROM
          sys.shards
        WHERE
          primary = TRUE
        GROUP BY
          table_name,
          schema_name
      )
      SELECT
        inf.table_schema,
        ARRAY_AGG(
          {
            "table_name" = inf.table_name,
            "table_schema" = inf.table_schema,
            "replicas" = inf.number_of_replicas,
            "shards" = sha.shards,
            "partitions_health" = he.partitions_health,
            "overall_health" = he.overall_health,
            "total_records" = sha.total_records,
            "total_size_bytes" = sha.total_size_bytes,
            "total_missing_shards" = he.total_missing_shards,
            "total_underreplicated_shards" = he.total_underreplicated_shards,
            "table_type" = inf.table_type,
            "partitioned_by" = inf.partitioned_by,
            "clustered_by" = inf.clustered_by,
            "version" = inf.version
          }
        ) AS tables
      FROM
        information_schema.tables inf
        LEFT JOIN partitions_health he ON inf.table_name = he.table_name
        and inf.table_schema = he.table_schema
        LEFT JOIN shards sha ON inf.table_name = sha.table_name
        AND inf.table_schema = sha.table_schema
      GROUP BY
        inf.table_schema
      ORDER BY
        CASE WHEN table_schema IN ('doc') THEN 0 WHEN table_schema IN (
          'sys',
          'information_schema',
          'pg_catalog',
          'blob'
        ) THEN 2 ELSE 1 END,
        table_schema;
        `,
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
  TABLE_LAST_INSERT: `
    SELECT ended
    FROM "sys"."jobs_log"
    WHERE classification['type'] = 'INSERT'
      AND stmt LIKE '%%table_schema.%table_name%'
    ORDER BY Ended DESC LIMIT
        1
  `,
}
