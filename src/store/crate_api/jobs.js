import {ALT_ADMIN_UUID} from "@/store/http/requests";


export class Jobs {
  jobs = []

  get_job_by_node(node_name){
    return this.jobs.filter((job)=> job.node.name === node_name)
  }

  constructor(data) {
    for (const job_data of data) {
      const new_job = new Job(...job_data)
      this.jobs.push(new_job)
    }
  }
}

class Job {
  is_from_admin_ui(){
    return this._raw_stmt.includes(ALT_ADMIN_UUID)
  }


  constructor(id, node, started, stmt, username) {
    this._raw_stmt = stmt
    this.stmt = stmt.replace(ALT_ADMIN_UUID, '')

    this.id = id
    this.node = node
    this.started = started
    this.username = username
  }
}

