// Represent a SQL table columns, for example
// Table: tbl1
// Columns:
// |-------------------------|
// | Col | type | is_nullable |
// | id  | int  | false      |
// | name| str  | true       |
// |-------------------------|

export class Columns {
  columns = []

    to_table_format() {
        return this.columns.map((column) => {
            return {
                ordinal_position: column.ordinal_position,
                column_name: column.column_name,
                data_type: column.data_type,
                is_nullable: column.is_nullable,
                column_default: column.column_default
            }
        })
    }

  constructor(data) {
    for (const raw_column of data) {
      const new_column = new Column(...raw_column)
      this.columns.push(new_column)
    }
  }
}

class Column {
  constructor(ordinal_position, column_name, data_type, is_nullable, column_default) {
      this.ordinal_position = ordinal_position
      this.column_name = column_name
      this.data_type = data_type
      this.is_nullable = is_nullable
      this.column_default = column_default
  }
}
