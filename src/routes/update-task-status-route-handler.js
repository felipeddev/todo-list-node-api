import { Database } from '../database.js'

async function validateTaskId(id, database) {
  const tasks = await database.select('tasks', { id })
  const task = tasks[0]

  if (!task) {
    const taskNotFoundError = {
      error: 'TASK_NOT_FOUND',
      message: 'Failed to update a Task',
      details: `No Task found with the id ${id}`
    }

    return {
      isValid: false,
      error: taskNotFoundError,
    }
  }

  return {
    isValid: true,
    task,
  }
}

export async function updateTaskStatusRouteHandler(request, response) {
  const database = new Database()

  const { id } = request.params

  const { isValid, error, task } = await validateTaskId(id, database)

  if (!isValid) {
    response.writeHead(404).end(JSON.stringify(error))
    return
  }

  await database.update('tasks', id, {
    ...task,
    completed_at: task.completed_at ? null : Date.now(),
    updated_at: Date.now(),
  })

  response.writeHead(204).end()
}