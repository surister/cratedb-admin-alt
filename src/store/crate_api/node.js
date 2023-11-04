export class CrateNodes {
  nodes = []
  // TODO See if we use CrateNodes.node_count, I think it might make no sense to have it stored here as well
  // since we already store the node count within the node_info_store
  node_count = 0

  constructor(data, node_count) {
    if (node_count === 0) {
      return
    }

    this.node_count = node_count

    let master = true

    for (const datum of data) {
      // The indexes that we assign the data to, is related to the query we use, be careful if you change the
      // query order, indexes will change and break.
      let new_node = new Node(
        master,
        datum[0],
        {
          load1: datum[1][1],
          load5: datum[1][5],
          load15: datum[1][15],
        },
        datum[2],
        datum[3],
        datum[4],
        datum[5],
        datum[6]
      )

      this.nodes.push(new_node)

      if (master) {
        // We use this to pass true to isMaster to the first node
        // we are assuming that CrateDB always returns the master node in the first position.
        master = false
      }
    }
  }

  get_master_node() {
    // Master always comes first in the API response.
    return this.nodes[0]
  }

  has_nodes() {
    return this.nodes.length !== 0
  }

  to_table_format() {
    return this.nodes.map((node) => {
      return {
        node_name: {
          name: node.name,
          is_master: node.is_master
        },
        os_info: node.os_info,
        version: node.version,
        disk_usage: node.fs,
        heap_usage: node.heap,
        http_endpoint: node.http_endpoint,
        load: node.load
      }
    })
  }
}

class Node {
  constructor(is_master, name, load, fs, heap, rest_url, version, os_info) {
    this.is_master = is_master
    this.name = name
    this.load = load
    this.fs = fs
    this.heap = heap
    this.http_endpoint = rest_url
    this.version = version
    this.os_info = os_info
  }
}
