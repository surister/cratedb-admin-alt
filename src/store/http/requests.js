import {useStoredPreferencesStore} from "@/store/storedPreferences";

export async function requestCrate(stmt, queryParams = '', stmtReplacedParams= {}) {
  const storedPreferences = useStoredPreferencesStore()
  let url = storedPreferences.general.masterNodeUrl + '/_sql'
  if (queryParams) {
    url = url + '?' + queryParams
  }

  if (stmtReplacedParams) {
    Object.entries(stmtReplacedParams).map(entry => {
      stmt = stmt.replace(entry[0], entry[1])
    });
  }

  return await fetch(
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
}
