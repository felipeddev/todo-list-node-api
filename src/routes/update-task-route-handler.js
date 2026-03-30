import { Database } from '../database.js'

const database = new Database()

async function validateTaskId(id) {
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

export async function updateTaskRouteHandler(request, response) {
  const { id } = request.params
  const { title, description } = request.body

  if (!title || !description) {
    const missingParamsError = {
      error: 'TASK_INVALID_PARAMS',
      message: 'Failed to create a Task',
      details: 'The field `title` and `description` is required'
    }

    response.writeHead(400).end(JSON.stringify(missingParamsError))
    return
  }

  const { isValid, error, task } = await validateTaskId(id)

  if (!isValid) {
    response.writeHead(404).end(JSON.stringify(error))
    return
  }

  await database.update('tasks', id, {
    ...task,
    title,
    description,
    updated_at: Date.now(),
  })

  response.writeHead(204).end()
}
