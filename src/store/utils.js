import sqlFormatter from "sql-formatter-plus/lib/sqlFormatter";

export function adaptVTableHeader(arr, align = 'start', sortable = false, enable_filter_special = null) {
  // Adapts a flat string array like [ 'col1', 'col2', 'col3' ]
  // to a format that used in Vuetify Data tables headers:
  // https://vuetifyjs.com/en/components/data-tables/basics/
  //
  // [
  //   {
  //     title: 'col1',
  //     align: 'start',
  //     sortable: false,
  //     key: 'name',
  //   },
  //   {
  //     title: 'col2',
  //     align: 'start',
  //     sortable: false,
  //     key: 'name',
  //   },
  // ]
  //
  // It applies 'align' and 'sortable' everywhere, useful when you don't care about per-row customization.
  // key is always lower case and joined by '_', so a title of 'HTTP ENDPOINT' will be transformed to 'http_endpoint'
  // this is very important when you use this on tables, because the key of the item has to match the 'key' of
  // the header list.

  let colList = []

  for (const col of arr) {
    colList.push(
      {
        title: col,
        align: align,
        sortable: sortable,
        key: col.toLowerCase().split(' ').join('_')
      }
    )
  }

  if (enable_filter_special != null) {
    for (const col of colList) {
      if (enable_filter_special.includes(col.key)) {
        col.filter_special = true
      }
    }
  }
  return colList
}

export function adaptVTableItems(items, headers) {
  let adaptedItems = []
  for (const item of items) {
    let newItem = {}
    for (const i in headers) {
      newItem[headers[i]] = item[i]
    }
    adaptedItems.push(newItem)
  }
  return adaptedItems
}

export function is_object(o) {
  return typeof o === 'object' && !Array.isArray(o) && o !== null
}

export function is_array(o) {
  return typeof o === 'object' && Array.isArray(o) && o !== null
}

export function human_file_size(bytes, si = true, dp = 1) {
  // Transform bytes example: 23924082398 into human-readable values such as: 38TB, 10kB, 18MB
  // Even if we call it bytes, it accepts 'bits' since we support both unit scales.
  if (bytes === null) {
    return bytes
  }
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
}

export function human_numbers(number) {
  const options = {notation: 'compact', unitDisplay: 'narrow'}

  let result = Intl.NumberFormat('en', options).format(number)

  return `${number > 100 ? '~' : ''}${result}`
}

export function separate_integer_by(integer, separator) {
  // Separates an `integer` every 3 position by `separator`
  // separate_integer_by(234234, ' ')
  // > 234 234
  // separate_integer_by(23423486, '_')
  // > 23_423_486
  return integer.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator)
}

export function color_objects(object) {
  switch (typeof object) {
    case "string":
      return '#6A8759'
    case "number":
      return '#6897BB'
    case "boolean":
      return '#CC7832'
    default:
      return ''
  }
}

export function format_sql(stmt) {
  return sqlFormatter.format(stmt, {language: 'sql', tabulateAlias: true})
}

export function download(object, format) {
  const jsonData = JSON.stringify(object);
  const blob = new Blob([jsonData], {type: 'application/json'});
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();

  URL.revokeObjectURL(url);
}

function rows_to_table_values(rows, _max_rows) {
  let max_rows = Math.min(rows.length, _max_rows)
  let rows_table = ``
  for (let i = 0; i < max_rows; i++) {
    const row = rows[i]
    let _row = '|'
    for (const row_el of row) {
      _row += `${JSON.stringify(row_el)}|`
    }
    rows_table += `${_row}\n`
  }
  return rows_table
}

export function query_to_markdown(date, crate_version, query, query_meta_subtitle, query_result_headers, query_result_rows, max_rows) {
  const query_meta = `##### Query ran at ${date} on CrateDB ${crate_version}\n`
  const sql_query = '```\n' + `${format_sql(query)}` + '\n```'
  let query_result_meta = `\n##### ${query_meta_subtitle}`

  if (query_result_rows) {
    query_result_meta += `, showing ${Math.min(query_result_rows.length, 15)} row(s).`
  }

  const query_result_table_headers = query_result_headers ? `\n\n|${query_result_headers.join('|')}|` : ''
  const query_result_table_header_separator = query_result_headers ? `\n |${'-|'.repeat(query_result_headers.length)} \n` : ''
  const query_result_table_values = query_result_rows ? rows_to_table_values(query_result_rows, max_rows) : ''
  return query_meta + sql_query + query_result_meta + query_result_table_headers + query_result_table_header_separator + query_result_table_values
}

export function delta_from_now(time) {
  const diff = new Date().getTime() - new Date(time).getTime();
  return Math.round((diff / 60000));
}
