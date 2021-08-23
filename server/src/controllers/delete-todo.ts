import { Request, Response } from 'express'
import { param } from 'express-validator'
import TodosService from '../services/todos-service'

export const deleteTodoValidator = [param('id').notEmpty()]

export const deleteTodo = (todosService: TodosService) => async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedTodo = todosService.deleteTodo(id)

    return res.json({
      todo: deletedTodo,
    })
  } catch (err) {
    return res.status(400).json({
      error: 'Failed to delete todo.',
    })
  }
}
