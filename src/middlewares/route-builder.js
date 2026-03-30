export async function buildRoute(request, response) {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    const encodedBody = Buffer.concat(buffers).toString();
    const parsedBody = JSON.parse(encodedBody)

    request.body = parsedBody
  } catch (err) {
    request.body = null
  }

  response.setHeader('Content-Type', 'application/json')
}