import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import {request_crate} from "@/store/http/requests";
import queries from "@/store/http/queries";



export const use_vector_store = defineStore('vectors', () => {
  const state = reactive({})

  async function knn_search(extra_fields, table_name, vec_column_name, vector, n_results) {
    const _response = await request_crate(
      queries.KNN_SEARCH,
      null,
      {
        '%extra_fields': extra_fields ? extra_fields + ',' : extra_fields,
        '%extra_fields_i': extra_fields ? extra_fields + ',' : extra_fields,
        '%table_name': table_name,
        '%vec_column_name': vec_column_name,
        '%vector': vector,
        '%n_results': n_results
      }
    )
    const data = await _response.json()
    return data
  }

  return {
    ...toRefs(state),
    knn_search,
  }
})
