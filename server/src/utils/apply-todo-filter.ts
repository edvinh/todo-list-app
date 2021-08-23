import { orderBy } from 'lodash'
import { Todo, TodoFilter } from '../types'

export function applyTodoFilter(todos: Todo[], filter: TodoFilter) {
  let filteredTodos = [...todos]

  if (filter.filter) {
    filteredTodos = filteredTodos.filter(todo => todo.title.includes(filter.filter || ''))
  }

  if (filter.state) {
    const doneState = filter.state === 'done'
    filteredTodos = filteredTodos.filter(todo => todo.done === doneState)
  }

  if (filter.sortBy) {
    filteredTodos = orderBy(filteredTodos, filter.sortBy, filter.orderBy || 'asc')
  }

  const count = filteredTodos.length

  if (filter.offset) {
    filteredTodos = filteredTodos.slice(filter.offset * filter.limit)
  }

  if (filter.limit) {
    filteredTodos = filteredTodos.slice(0, filter.limit)
  }

  const pageInfo = {
    count,
    total: todos.length,
    hasNextPage: filteredTodos.length < count - filter.limit * filter.offset,
    page: filter.offset + 1,
    totalPages: Math.ceil(count / filter.limit),
  }

  return { filteredTodos, pageInfo }
}
