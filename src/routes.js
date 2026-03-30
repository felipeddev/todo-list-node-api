import { buildRoutePath } from './utils/build-route-path.js'
import { createTaskRouteHandler } from './routes/create-task-route-handler.js'
import { deleteTaskRouteHandler } from './routes/delete-task-route-handler.js'
import { listTasksRouteHandler } from './routes/list-tasks-route-handler.js'
import { updateTaskRouteHandler } from './routes/update-task-route-handler.js'

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: createTaskRouteHandler
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: listTasksRouteHandler
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: updateTaskRouteHandler,
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: deleteTaskRouteHandler,
  }
]