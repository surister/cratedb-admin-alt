import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {Repositories} from "@/store/crate_api/repositories";
import {request_crate} from "@/store/http/requests";
import queries from "@/store/http/queries";

export const use_repositories_store = defineStore('repositories', () => {
  const state = reactive({
    repositories: new Repositories([]),
    current_open_repository: null
  })

  async function update_repositories() {
    const response = await request_crate(queries.REPOSITORIES)
    const data = await response.json()
    state.repositories = new Repositories(data.rows)
  }

  async function drop_repository() {
    const response = await request_crate(queries.DROP_REPOSITORY, null, {
      '%repository_name': state.current_open_repository.name
    })

    if (response.ok) {
      state.current_open_repository = null
      await update_repositories()
    }
    return response
  }

  async function create_repository(repository_name, repository_type, options){
    //CREATE REPOSITORY myrepo2 TYPE fs WITH (location = '/data/backup/repo2')
    const opts = `location = '${options.location}'`

    const response = await request_crate(queries.CREATE_REPOSITORY, null, {
      '%repository_name': repository_name,
      '%type': repository_type,
      '%options': opts
    })

    if (response.ok){
      await update_repositories()
    }
    return response
  }

  async function create_snapshot(options){
    const { name, wait_for_completion, ignore_unavailable, all_tables, tables } = options
    const response = await request_crate(queries.CREATE_SNAPSHOT, null, {
      '%repository_name': `"${state.current_open_repository.name}"."${name.replace(' ', '_')}"`,
      '%tables': all_tables ? 'ALL' : tables,
      '%wait_for_completion': wait_for_completion,
      '%ignore_unavailable': ignore_unavailable,
      '%SQL_TABLE_STMT': all_tables ? '' : 'TABLE',
    })
    if (response.ok) {
        await update_repositories()
        // A  way of updating the state locally of a .current_opened_something.
        // In tables and users we handle the data manually, but doing so in here would be inaccurate
        // since we actually need data from the server that we cannot know beforehand,
        // such as finished time, failures...
        for (const repository of state.repositories.repositories) {
          if (repository.name === state.current_open_repository.name){
            state.current_open_repository = repository
          }
        }
    }
    return response
  }

  async function drop_snapshot(snapshot_name){
    const response = await request_crate(queries.DROP_SNAPSHOT, null, {
      '%snapshot_name': snapshot_name,
      '%repository_name': state.current_open_repository.name
    })
    if (response.ok){
      state.current_open_repository.remove_snapshot(snapshot_name)
    }
    return response
  }

  return {
    ...toRefs(state),
    update_repositories,
    drop_repository,
    create_repository,
    create_snapshot,
    drop_snapshot
  }

})
