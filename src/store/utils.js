export function adaptVTableHeader(arr, align = 'start', sortable = false) {
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

export function isObject(o) {
  return typeof o === 'object' && !Array.isArray(o) && o !== null
}

export function isArray(o) {
  return typeof o === 'object' && Array.isArray(o) && o !== null
}

export function humanFileSize(bytes, si=true, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
}
