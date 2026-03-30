import { Database } from '../database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export async function createTaskRouteHandler(request, response) {
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

  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: Date.now(),
    updated_at: Date.now(),
  }

  await database.insert('tasks', task)

  response.writeHead(201).end()
}