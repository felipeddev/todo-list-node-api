import { Database } from '../database.js'

const database = new Database()

export async function listTasksRouteHandler(request, response) {
  const { search } = request.query

  const tasks = await database.select('tasks', search ? {
    title: search,
    description: search,
  } : null)

  console.log(tasks)
  response.end(JSON.stringify(tasks))
}