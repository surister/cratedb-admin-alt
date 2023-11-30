export class Repositories {
  repositories = []

  constructor(data) {
    for (const datum of data) {
      const repository = new Repository(...datum)
      const snapshots = datum.at(-1)

      for (const snapshot of snapshots) {
        const new_snapshot = new Snapshot(...Object.values(snapshot))
        repository.snapshots.push(new_snapshot)
      }
      this.repositories.push(repository)
    }
  }
}

class Repository {
  snapshots = []

  constructor(name, type, settings) {
    this.name = name
    this.type = type
    this.settings = settings
  }
}

class Snapshot {
  constructor(name, state, concrete_indices, failures, started, finished, table_partitions, tables, version) {
    this.name = name
    this.state = state
    this.concrete_indices = concrete_indices
    this.failures = failures
    this.started = started
    this.finished = finished
    this.table_partitions = table_partitions
    this.tables = tables
    this.version = version
  }
}
