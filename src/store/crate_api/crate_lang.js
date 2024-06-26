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
    // {name: 'TIMESTAMP WITH TIME ZONE', has_input: false},
    {name: 'TIMESTAMP', has_input: false},
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
    'AS',
    'AND',
    'ASC',
    'ALTER CLUSTER',
    'ALTER PUBLICATION',
    'ALTER TABLE',
    'ALTER USER',
    'ANALYZE',
    'BEGIN',
    'CLOSE',
    'COMMIT',
    'COLUMN',
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
    'CONSTRAINT',
    'CHECK',
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
    'DROP',
    'DESC',
    'END',
    'EXPLAIN',
    'FETCH',
    'GRANT',
    'INSERT',
    'KILL',
    'NOT',
    'OPTIMIZE',
    'PRIMARY KEY',
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
]

export const CRATE_VALUES = [
    'TRUE',
    'FALSE',
    'NULL',
]

export const CRATE_FUNCTIONS = [
  // https://cratedb.com/docs/crate/reference/en/5.5/general/builtins/scalar-functions.html
  // String
  'CONCAT',
  'CONCAT_WS',
  'FORMAT',
  'SUBSTR',
  'CHAR_LENGTH',
  'LENGTH',
  'BIT_LENGTH',
  'OCTET_LENGTH',
  'ASCII',
  'CHR',
  'LOWER',
  'UPPER',
  'INITCAP',
  'SHA1',
  'MD5',
  'REPLACE',
  'TRANSLATE',
  'TRANSLATE',
  'TRIM',
  'LTRIM',
  'RTRIM',
  'BTRIM',
  'QUOTE_IDENT',
  'LPAD',
  'RPAD',
  'ENCODE',
  'DECODE',
  'REPEAT',
  'SPLIT_PART',
  'PARSE_URI',
  'PARSE_URL',

  // Dates and time.
  'DATE_TRUNC',
  'DATE_BIN',
  'EXTRACT',
  'CURRENT_TIME',
  'CURRENT_TIMESTAMP',
  'CURDATE',
  'CURRENT_DATE',
  'NOW',
  'DATE_FORMAT',
  'TIMEZONE',
  'TO_CHAR',
  'AGE',

  // Geo functions
  'DISTANCE',
  'WITHIN',
  'INTERSECTS',
  'LATITUDE',
  'GEOHASH',
  'AREA',

  // Math
  'ABS',
  'CEIL',
  'CEILING',
  'DEGREES',
  'EXP',
  'FLOOR',
  'LN',
  'LOG',
  'MODULUS',
  'MOD',
  'POWER',
  'RADIANS',
  'RANDOM',
  'GEN_RANDOM_TEXT_UUID',
  'ROUND',
  'TRUNC',
  'SQRT',
  'SIN',
  'ASIN',
  'COS',
  'ACOS',
  'TAN',
  'COT',
  'ATAN',
  'ATAN2',
  'PI',

  // Regex
  'REGEX_REPLACE',

  // Containers
  'ARRAY_AGG'
]

export const CRATE_TYPES = {
  0: {name: 'NULL'},
  1: {name: 'Not supported'},
  2: {name: 'CHAR'},
  3: {name: 'BOOLEAN'},
  4: {name: 'TEXT'},
  5: {name: 'IP'},
  6: {name: 'DOUBLE PRECISION'},
  7: {name: 'REAL'},
  8: {name: 'SMALLINT'},
  9: {name: 'INTEGER'},
  10: {name: 'BIGINT'},
  11: {name: 'TIMESTAMP WITH TIME ZONE'},
  12: {name: 'OBJECT'},
  13: {name: 'GEO_POINT'},
  14: {name: 'GEO_SHAPE'},
  15: {name: 'TIMESTAMP WITHOUT TIME ZONE'},
  16: {name: 'Unchecked object'},
  17: {name: 'Interval'},
  19: {name: 'REGPROC'},
  20: {name: 'TIME'},
  21: {name: 'OIDVECTOR'},
  22: {name: 'NUMERIC'},
  23: {name: 'REGCLASS'},
  24: {name: 'DATE'},
  25: {name: 'BIT'},
  26: {name: 'JSON'},
  27: {name: 'CHARACTER'},
  28: {name: 'FLOAT_VECTOR'},

  100: {name: 'ARRAY'},

  null: {name: 'UNKNOWN'}
}

export function get_type_name(id) {
  const type = CRATE_TYPES[id] || CRATE_TYPES.null
  return type.name.toLowerCase()
}

export const CRATE_HEALTH_LEGEND = {
  GREEN: {
    icon: 'mdi-check',
    color: 'green',
    message: 'All shards (primary and replicated) are started.',
    short_description: 'Healthy'
  },
  YELLOW: {
    icon: 'mdi-alert',
    color: 'warning',
    message: 'At least one shard is under-replicated (replica shard not started or unassigned).',
    short_description: 'Unhealthy'
  },
  RED: {
    icon: 'mdi-close-octagon',
    color: 'red',
    message: 'At least one primary shard is missing (primary shard not started or unassigned).',
    short_description: 'Very unhealthy'
  },
  UNKNOWN: {
    icon: 'mdi-wifi-strength-alert-outline',
    color: '',
    message: 'Cannot get health info, check that you have connection, that the cluster is up or that there are tables in the cluster.',
    short_description: 'Health not known'
  }
}
