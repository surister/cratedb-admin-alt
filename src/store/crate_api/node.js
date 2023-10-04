export class CrateNodes {
  // The purpose of this class is to create the different CrateNode(s) from the HTTP json response  and
  // to offer some utilities such as filtering of nodes.
  nodes = []
  nodeCount = 0

  constructor(data, nodeCount) {
    if (nodeCount === 0){ return }

    this.nodeCount = nodeCount

    let master = true

    for (const rawNodeData of data) {
      // The indexes that we assign the data to, is related to the query we use, be careful.
      let newNode = new CrateNode(
        master,
        rawNodeData[0],
        rawNodeData[4],
        {load1: rawNodeData[1][1], load5: rawNodeData[1][5], load15: rawNodeData[1][15]}
      )

      this.nodes.push(newNode)

      if (!master) {
        // We use this to pass true to isMaster to the first node
        // we are assuming that CrateDB always returns the master node in the first position.
        master = false
      }
    }
  }

  getMasterNode() {
    return this.nodes[0]
  }

  hasNodes(){
    return this.nodes.length != 0
  }

  toVDataItems(){
    return this.nodes.map((node) => {
      return {
        node: {
          name: node.name,
          version: node.version,
          isMaster: node.isMaster
        },
        http_endpoint: node.http_endpoint,
        load: node.load
      }
    })
  }
}

class CrateNode {
  constructor(isMaster, name, httpEndpoint, load) {
    this.isMaster = isMaster
    this.name = name
    this.http_endpoint = httpEndpoint
    this.load = load
  }
}
