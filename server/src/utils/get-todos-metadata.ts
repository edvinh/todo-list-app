import { Todo } from '../types'

export function getTodosMetadata(todos: Todo[]) {
  const doneTodos = todos.filter(todo => todo.done).length
  const activeTodos = todos.length - doneTodos

  return { done: doneTodos, active: activeTodos }
}
