import { randomUUID } from 'crypto'
import { Todo, TodoFilter } from '../types'
import { applyTodoFilter, getTodosMetadata } from '../utils'

/**
 * TodosService is responsible for all todos. Normally you would couple this with a DB service as well,
 * but we're just persisting the todos in-memory for simplicity's sake.
 */
export default class TodosService {
  private todos: Todo[]

  constructor(todos: Todo[] = []) {
    this.todos = todos
  }

  getTodos(filter: TodoFilter) {
    const { filteredTodos, pageInfo } = applyTodoFilter(this.todos, filter)
    const metadata = getTodosMetadata(this.todos)

    return { todos: this.todos, filteredTodos, pageInfo, metadata }
  }

  addTodo(todo: Todo) {
    this.todos.push({ ...todo, id: randomUUID() })
  }

  updateTodo(id: string, newTodoFields: Partial<Todo>) {
    const foundTodoIndex = this.todos.findIndex(todo => todo.id === id)

    if (foundTodoIndex === -1) {
      throw new Error(`Todo with ID ${id} not found`)
    }

    const updatedTodo = {
      ...this.todos[foundTodoIndex],
      ...newTodoFields,
    }

    this.todos[foundTodoIndex] = updatedTodo

    return updatedTodo
  }

  deleteTodo(id: string) {
    const foundTodoIndex = this.todos.findIndex(todo => todo.id === id)

    if (foundTodoIndex === -1) {
      throw new Error(`Todo with ID ${id} not found`)
    }

    const [deletedTodo] = this.todos.splice(foundTodoIndex, 1)

    return deletedTodo
  }
}
