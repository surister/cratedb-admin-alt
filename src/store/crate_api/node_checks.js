export class NodeChecks {
  node_checks = []

  isEmpty(){
    return this.node_checks.length === 0
  }

  constructor(data) {
    for (const raw_node_check_data of data) {
      let new_node_check = new NodeCheck(
        ...raw_node_check_data
      )
        this.node_checks.push(new_node_check)
    }
  }
}

class NodeCheck {
  constructor(id, node_id, severity, acknowledged, description) {
    this.id = id
    this.node_id = node_id
    this.severity = severity
    this.acknowledged = acknowledged
    this.description = description
  }
}
