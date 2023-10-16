export class Jobs {
  jobs = []

  get_job_by_node(node_name){
    return this.jobs.filter((job)=> job.node.name === node_name)
  }

  toVDataItems(){
    return this.jobs.map((job) =>{
      return {
        id: job.id,
        node_name: job.node.name,
        started: job.started,
        stmt: job.stmt,
        user: job.username,
      }
    })
  }
  constructor(data) {
    for (const job_data of data) {
      const new_job = new Job(...job_data)
      this.jobs.push(new_job)
    }
  }
}

class Job {
  constructor(id, node, started, stmt, username) {
    this.id = id
    this.node = node
    this.started = started
    this.stmt = stmt
    this.username = username
  }
}

