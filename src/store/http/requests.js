export async function requestCrate(stmt, options) {
  return await fetch(
      'http://localhost:4201/_sql' + '?' + options,
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
