export class AllocationIssues{
  issues = []

  getBadHealthByTable(table_name) {
      return this.issues.filter((issue) => issue.table_name === table_name)
  }
  constructor(data) {
    if (Array.isArray(data) && data.length === 0){
      return
    }

    for (const rawAllocationIssueData of data) {
      const newAllocationIssue = new AllocationIssue(
        rawAllocationIssueData[0],
        rawAllocationIssueData[1],
        rawAllocationIssueData[2],
        rawAllocationIssueData[3],
        rawAllocationIssueData[4],
        rawAllocationIssueData[5],
        rawAllocationIssueData[6],
        rawAllocationIssueData[7],
        rawAllocationIssueData[8]
      )
      this.issues.push(newAllocationIssue)
    }
  }
}

class AllocationIssue {
  constructor(current_state,
              decisions,
              explanation,
              node_id,
              partition_ident,
              primary,
              shard_id,
              table_name,
              table_schema) {
    this.current_state = current_state
    this.decisions = decisions
    this.explanation = explanation
    this.node_id = node_id
    this.partition_ident = partition_ident
    this.primary = primary
    this.shard_id = shard_id
    this.table_name = table_name
    this.table_schema = table_schema
  }
}

