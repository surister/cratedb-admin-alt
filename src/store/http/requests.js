export async function requestCrate(stmt) {
  const response = await fetch(
    'http://localhost:4201/_sql',
    {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({'stmt': stmt}),
      headers: {
        "Content-Type": "application/json",

      },
    }
  )
  return await response.json();
}
