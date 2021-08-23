import { useMutation, useQueryClient } from 'react-query'
import { TODO_URL } from '../api'
import { Todo } from '../types'

/**
 * Hook for adding a Todo.
 */
export default function useAddTodo() {
  const queryClient = useQueryClient()

  const { mutate, isLoading, ...rest } = useMutation(addTodoQuery, {
    // Refetch all todos when adding a new todo
    onSettled: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  return {
    addTodo: mutate,
    addingTodo: isLoading,
    isLoading,
    mutate,
    ...rest,
  }
}

const addTodoQuery = async (todo: Partial<Todo>) => {
  const res = await fetch(TODO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...todo,
    }),
  })

  return res.json()
}
