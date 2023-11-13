export const DATA_TYPES = [
    // has_input refers to the input the data type can receive,
    // example: VARCHAR(default_input), where VARCHAR(100) '100' would be the input.

    {name: 'BOOLEAN', has_input: false},

    // Text
    {name: 'TEXT', has_input: false},
    {name: 'VARCHAR', has_input: true, default: 100},
    {name: 'CHARACTER', has_input: true, default: 100},
    {name: 'CHAR', has_input: true, default: 100},


    // Numbers
    {name: 'SMALLINT', has_input: false},
    {name: 'INTEGER', has_input: false},
    {name: 'BIGINT', has_input: false},
    {name: 'REAL', has_input: false},
    {name: 'DOUBLE PRECISION', has_input: false},
    {name: 'BOOLEAN', has_input: false},
    {name: 'NUMERIC', has_input: true},

    // Date-Times
    {name: 'TIMESTAMP WITH TIME ZONE', has_input: false},
    {name: 'TIMESTAMP WITHOUT TIME ZONE', has_input: false},
    {name: 'DATE', has_input: false},
    {name: 'TIME', has_input: false},

    // Other
    {name: 'BIT', has_input: true, default: 8},

    // Containers
    {name: 'OBJECT', has_input: false},
    {name: 'ARRAY', has_input: false},
    {name: 'GEO_SHAPE', has_input: false},
    {name: 'FLOAT_VECTOR', has_input: true, default: 2},
]

export const CRATE_KEYWORDS = [
    'ALTER CLUSTER',
    'ALTER PUBLICATION',
    'ALTER TABLE',
    'ALTER USER',
    'ANALYZE',
    'BEGIN',
    'CLOSE',
    'COMMIT',
    'COPY FROM',
    'COPY TO',
    'CREATE ANALYZER',
    'CREATE BLOB TABLE',
    'CREATE PUBLICATION',
    'CREATE REPOSITORY',
    'CREATE SNAPSHOT',
    'CREATE SUBSCRIPTION',
    'CREATE TABLE',
    'CREATE USER',
    'CREATE VIEW',
    'DEALLOCATE',
    'DECLARE',
    'DELETE',
    'DENY',
    'DISCARD',
    'DROP ANALYZER',
    'DROP FUNCTION',
    'DROP PUBLICATION',
    'DROP REPOSITORY',
    'DROP SNAPSHOT',
    'DROP SUBSCRIPTION',
    'DROP TABLE',
    'DROP USER',
    'DROP VIEW',
    'END',
    'EXPLAIN',
    'FETCH',
    'GRANT',
    'INSERT',
    'KILL',
    'OPTIMIZE',
    'REFRESH',
    'RESTORE SNAPSHOT',
    'REVOKE',
    'SELECT',
    'SET and RESET',
    'SET LICENSE',
    'SET AND RESET SESSION AUTHORIZATION',
    'SET TRANSACTION',
    'SHOW',
    'SHOW COLUMNS',
    'SHOW CREATE TABLE',
    'SHOW TABLES',
    'START TRANSACTION',
    'UPDATE',
    'VALUES',
    'WITH',
    'LIMIT',
    'FROM',
    'AS',
    'DISTINCT',
    'WHERE',
    'GROUP BY',
    'ORDER BY',
    'ON',
    'RIGHT',
    'LEFT',
    'JOIN',
    'OUTER',
    'JOIN',
    'AND'
]

export const CRATE_VALUES = [
    'true',
    'false',
    'null',
]

export const CRATE_FUNCTIONS = ['SUM', 'MIN', 'MAX']
