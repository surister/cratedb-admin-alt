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
    const response = await request_crate(queries.CREATE_SNAPSHOT)
  }
  return {
    ...toRefs(state),
    update_repositories,
    drop_repository,
    create_repository,
    create_snapshot
  }

})
