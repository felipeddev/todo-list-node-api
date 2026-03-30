import { Database } from '../database.js'

const database = new Database()

export async function listTasksRouteHandler(request, response) {
  const { search } = request.query

  const tasks = database.select('tasks', search ? {
    title: search,
    description: search,
  } : null)

  response.end(JSON.stringify(tasks))
}