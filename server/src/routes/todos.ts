import express, { Router } from 'express'
import { validateFields } from '../middleware'
import TodosService from '../services/todos-service'
import {
  addTodo,
  addTodoValidator,
  deleteTodo,
  deleteTodoValidator,
  getTodos,
  getTodosValidator,
  updateTodo,
  updateTodoValidator,
} from '../controllers'

export default function todosRouter(todosService: TodosService): Router {
  const router = express.Router()

  router.get('/', getTodosValidator, validateFields, getTodos(todosService))
  router.post('/', addTodoValidator, validateFields, addTodo(todosService))
  router.delete('/:id', deleteTodoValidator, validateFields, deleteTodo(todosService))
  router.put('/:id', updateTodoValidator, validateFields, updateTodo(todosService))

  return router
}
