import {useStoredPreferencesStore} from "@/store/storedPreferences";
import {useGlobalStore} from "@/store/globalStore";

export async function requestCrate(_stmt, queryParams = '', stmtReplacedParams= {}) {
  const storedPreferences = useStoredPreferencesStore()
  const globalStore = useGlobalStore()

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
