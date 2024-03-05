import {use_stored_preferences_store} from "@/store/storedPreferences";
import {use_global_store} from "@/store/global_store";
import {use_log_store} from "@/store/log";

export const ALT_ADMIN_UUID = '--d6e76c94-0569-4e65-a86a-59daa9f069e1-adminui'
export const ALT_ADMIN_UUID_CONSOLE = '--d6e76c94-0569-4e65-a86a-59daa9f069e1-console'

export async function request_crate(_stmt, query_params = '', sql_stmt_params= {}, is_from_console = false) {
  const stored_preferences = use_stored_preferences_store()
  const global_store = use_global_store()
  const log_store = use_log_store()

  let url = stored_preferences.general.master_node_url + '/_sql' + '?types'
  let stmt = _stmt // https://airbnb.io/javascript/#functions--reassign-params

  if (query_params) {
    url = url + '&' + query_params
  }

  if (stmt.endsWith(';')) {
    // We remove it.
    stmt = stmt.slice(0, -1)
  }

  if (sql_stmt_params) {
    Object.entries(sql_stmt_params).map(entry => {
      stmt = stmt.replace(entry[0], entry[1] != null ? entry[1]: '')
    });
  }

  if (is_from_console && stored_preferences.experimental_query_limit) {
    // We wrap the query in a with statement and apply our query_limit
    stmt = `with q as (${stmt})
            select *
            from q
            limit ${stored_preferences.console.query_limit}`
  }

  // We add a unique identifier in every query as a comment, so we can differentiate
  // if a given query in a CrateDB is from the Admin UI or Admin UI Console
  if (is_from_console) {
    stmt += ALT_ADMIN_UUID_CONSOLE
  } else {
    stmt += ALT_ADMIN_UUID
  }

  if (is_from_console) {
    await log_store.log_stmt_if_needed(stmt)
  }

  try {
    const request = await fetch(
      url,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({'stmt': stmt}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    global_store.show_network_connection_snackbar = false
    global_store.network_connection_attempts = 0
    return request

  } catch (err) {
    global_store.show_network_connection_snackbar = true
    global_store.network_connection_attempts += 1
  }
}
