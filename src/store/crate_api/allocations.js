export class AllocationIssues{
  issues = []

  get_issues_by_table(table_name) {
      return this.issues.filter((issue) => issue.table_name === table_name)
  }
  constructor(data) {
    if (Array.isArray(data) && data.length === 0){
      return
    }

    for (const datum of data) {
      const new_issue = new AllocationIssue(
          ...datum
      )
      this.issues.push(new_issue)
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

