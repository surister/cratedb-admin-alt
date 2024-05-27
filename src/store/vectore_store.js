import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {request_crate} from "@/store/http/requests";
import queries from "@/store/http/queries";



export const use_vector_store = defineStore('vectors', () => {
  const state = reactive({})
  async function knn_search(vec_table_name, vec_column_name, vector, n_results){
    const _response = await request_crate(
      queries.KNN_SEARCH,
      null,
      {
        '%vector_table': vec_table_name,
        '%vector_column': vec_column_name,
        '%vector': vector,
        '%limit_results': n_results,
      }
    )
    const data = await _response.json()
    return data
  }
  async function knn_search_with_join(vec_table_name, vec_column_name, vector, n_results, join_table_name, join_table_on, vec_join_table_on, selects_from_join) {
    const _response = await request_crate(
      queries.KNN_SEARCH_WITH_JOIN,
      null,
      {
        '%vec_table': vec_table_name,
        '%vec_column': vec_column_name,
        '%vector': vector,
        '%limit_results': n_results,
        '%join_table': join_table_name,
        '%join_table_on': join_table_on,
        '%selects_from_join': selects_from_join,
        '%vec_join_table_on': vec_join_table_on,
      }
    )
    const data = await _response.json()
    return data
  }

  async function fs_search(table_names, fs_column_name, text, selected_fields) {
    const responses = [];

    for (const table of table_names) {
      const _response = await request_crate(
        queries.FS_SEARCH, null,
        {
          '%table_name': table,
          '%column_name': fs_column_name,
          '%text': text,
          '%selected_fields': selected_fields
        }
      )
      const data = await _response.json()
      data.table_name = table
      responses.push(data)
    }
    return responses
  }

  async function hybrid_search(fs_table, fs_columns, fs_search_term, fs_fuzziness, vector_table, vector_column, vector, vector_limit) {
    console.log(fs_search_term)
    const _response = await request_crate(queries.HYBRID_SEARCH, null,
      {
        '%fs_table': fs_table,
        '%fs_columns': fs_columns,
        '%fs_search_term': fs_search_term,
        '%fs_fuzziness': fs_fuzziness,
        '%vector_table': vector_table,
        '%vector_column': vector_column,
        '%vector': vector,
        '%vector_limit': vector_limit
      })
    const data = await _response.json()
    return data
  }

  return {
    ...toRefs(state),
    knn_search_with_join,
    knn_search,
    fs_search,
    hybrid_search
  }
})
