import http from "node:http"
import { buildRoute } from "./middlewares/route-builder.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    await buildRoute(request, response)

    const routeParams = request.url.match(route.path)

    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = extractQueryParams(query)

    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(8080)