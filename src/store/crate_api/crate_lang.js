export const DATA_TYPES = [
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
