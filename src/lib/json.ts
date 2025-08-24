export const json = <Data>(
  data: Data,
  init: ResponseInit = {}
): Response => {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
}
