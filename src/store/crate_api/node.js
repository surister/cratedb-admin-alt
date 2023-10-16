export class CrateNodes {
  // The purpose of this class is to create the different Node(s) from the HTTP json response  and
  // to offer some utilities such as filtering of nodes.
  nodes = []
  nodeCount = 0

  constructor(data, nodeCount) {
    if (nodeCount === 0) {
      return
    }

    this.nodeCount = nodeCount

    let master = true

    for (const rawNodeData of data) {
      // The indexes that we assign the data to, is related to the query we use, be careful if you change the
      // query order, indexes will change and break.
      let newNode = new Node(
        master,
        rawNodeData[0],
        {
          load1: rawNodeData[1][1],
          load5: rawNodeData[1][5],
          load15: rawNodeData[1][15],
        },
        rawNodeData[2],
        rawNodeData[3],
        rawNodeData[4],
        rawNodeData[5],
        rawNodeData[6]
      )

      this.nodes.push(newNode)

      if (master) {
        // We use this to pass true to isMaster to the first node
        // we are assuming that CrateDB always returns the master node in the first position.
        master = false
      }
    }
  }

  getMasterNode() {
    // Master always comes first in the API response.
    return this.nodes[0]
  }

  hasNodes() {
    return this.nodes.length != 0
  }

  toVDataItems() {
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
