import { createTaskRouteHandler } from './routes/create-task-route-handler.js'
import { listTasksRouteHandler } from './routes/list-tasks-route-handler.js'
import { buildRoutePath } from './utils/build-route-path.js'

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
  }
]