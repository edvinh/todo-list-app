import { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { isNil, omitBy } from 'lodash'
import TodosService from '../services/todos-service'
import { Todo } from '../types'

export const updateTodoValidator = [
  param('id').notEmpty(),
  body('done').optional().toBoolean(),
  body('dueDate').optional().toInt(),
]

export const updateTodo = (todosService: TodosService) => async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, done, dueDate } = req.body

  const updatedTodoFields: Partial<Todo> = omitBy(
    {
      title,
      description,
      done,
      dueDate,
    },
    isNil
  )

  try {
    const updatedTodo = todosService.updateTodo(id, updatedTodoFields)

    return res.json({
      todo: updatedTodo,
    })
  } catch (err) {
    return res.status(400).json({
      error: 'Failed to delete todo.',
    })
  }
}
