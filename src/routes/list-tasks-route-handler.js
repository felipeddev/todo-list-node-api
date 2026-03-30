import { Database } from '../database.js'

export async function listTasksRouteHandler(request, response) {
  const database = new Database()

  const { search } = request.query

  const tasks = await database.select('tasks', search ? {
    title: search,
    description: search,
  } : null)

  response.end(JSON.stringify(tasks))
}