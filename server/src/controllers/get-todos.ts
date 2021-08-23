import { Request, Response } from 'express'
import { query } from 'express-validator'
import TodosService from '../services/todos-service'
import { TodoFilter } from '../types'

const DEFAULT_LIMIT = 10

export const getTodosValidator = [
  query('sortBy').optional().matches('title|done|dueDate'),
  query('orderBy').optional().matches('asc|desc'),
  query('limit').optional().toInt().isNumeric(),
  query('offset').optional().toInt().isNumeric(),
  query('state').optional().matches('done|active'),
]

export const getTodos = (todosService: TodosService) => async (req: Request, res: Response) => {
  const {
    sortBy = undefined,
    orderBy = undefined,
    limit = DEFAULT_LIMIT,
    offset = 0,
    filter = '',
    state,
  } = req.query as any // express-validator does some type conversions that TS can't pick up...

  const todoFilter: TodoFilter = {
    sortBy,
    orderBy,
    limit,
    offset,
    filter,
    state,
  }

  const { filteredTodos, pageInfo, metadata } = todosService.getTodos(todoFilter)

  return res.json({
    todos: filteredTodos,
    metadata,
    pageInfo,
  })
}
