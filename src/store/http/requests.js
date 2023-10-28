import {useStoredPreferencesStore} from "@/store/storedPreferences";
import {use_global_store} from "@/store/globalStore";

export const ALT_ADMIN_UUID = '--d6e76c94-0569-4e65-a86a-59daa9f069e1-cratealtadmin'

export async function requestCrate(_stmt, queryParams = '', stmtReplacedParams= {}) {
  const storedPreferences = useStoredPreferencesStore()
  const globalStore = use_global_store()

  let url = storedPreferences.general.masterNodeUrl + '/_sql'
  let stmt = _stmt // https://airbnb.io/javascript/#functions--reassign-params

  if (queryParams) {
    url = url + '?' + queryParams
  }

  if (stmtReplacedParams) {
    Object.entries(stmtReplacedParams).map(entry => {
      stmt = stmt.replace(entry[0], entry[1])
    });
  }

  // We add a unique identifier in every query as a comment, so we can differentiate
  // at least if a query was sent from the admin UI
  stmt += ALT_ADMIN_UUID

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
    globalStore.show_network_connection_snackbar = false
    globalStore.network_connection_attemps = 0
    return request

  } catch (err) {
    globalStore.show_network_connection_snackbar = true
    globalStore.network_connection_attemps += 1
  }

}
