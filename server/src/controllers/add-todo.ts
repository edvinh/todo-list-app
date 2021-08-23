import { Request, Response } from 'express'
import { body } from 'express-validator'
import TodosService from '../services/todos-service'
import { Todo } from '../types'

export const addTodoValidator = [
  body('title').notEmpty(),
  body('description').optional(),
  body('done').optional().toBoolean(),
  body('dueDate').optional().toInt().isNumeric(),
]

export const addTodo = (todosService: TodosService) => async (req: Request, res: Response) => {
  const { title, description, done, dueDate } = req.body

  const newTodo: Todo = {
    title,
    description,
    done: done || false,
    dueDate: dueDate || null,
  }

  todosService.addTodo(newTodo)

  return res.json({
    todo: newTodo,
  })
}
