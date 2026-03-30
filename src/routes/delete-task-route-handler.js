import { Database } from '../database.js'

export async function deleteTaskRouteHandler(request, response) {
  const database = new Database()

  const { id } = request.params

  const tasks = await database.select('tasks', { id })
  const task = tasks[0]

  if (!task) {
    const taskNotFoundError = {
      error: 'TASK_NOT_FOUND',
      message: 'Failed to delete a Task',
      details: `No Task found with the id ${id}`
    }

    response.writeHead(404).end(JSON.stringify(taskNotFoundError))
    return
  }

  await database.delete('tasks', id)

  response.writeHead(204).end()
}