export class Repositories {
  repositories = []

  constructor(data) {
    for (const datum of data) {
      const repository = new Repository(...datum)
      const snapshots = datum.at(-1)

      for (const [index, snapshot] of snapshots.entries()) {
        const new_snapshot = new Snapshot(index, ...Object.values(snapshot))
        repository.snapshots.push(new_snapshot)
      }
      this.repositories.push(repository)
    }
  }
}

class Repository {
  snapshots = []

  remove_snapshot(snapshot_name) {
    for (const snapshot of this.snapshots) {
      if (snapshot.name === snapshot_name) {
        const id = this.snapshots.indexOf(snapshot)
        this.snapshots.splice(id, 1)
      }
    }
  }
  constructor(name, type, settings) {
    this.name = name
    this.type = type
    this.settings = settings
  }
}

class Snapshot {
  constructor(id, name, state, concrete_indices, failures, started, finished, table_partitions, tables, version) {
    this.id = id
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
