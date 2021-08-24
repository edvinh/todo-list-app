import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { TODO_URL } from '../api'
import { Todo } from '../types'
import { useFilter } from './use-filter'
import { GetTodosResponse } from './use-todos'

/**
 * Hook for updating Todos.
 */
export default function useUpdateTodo() {
  const [filter] = useFilter()
  const queryClient = useQueryClient()

  const { mutate, isLoading, ...rest } = useMutation(updateTodoQuery, {
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<
        InfiniteData<GetTodosResponse>
      >(['todos', filter])

      // Find the updated Todo and update it in cache
      const newTodosPages = previousTodos?.pages.map(page => ({
        ...page,
        todos: page.todos.map(todo =>
          todo.id === newTodo.id ? newTodo : todo
        ),
      }))

      queryClient.setQueryData(['todos', filter], {
        ...previousTodos,
        pages: newTodosPages,
      })
    },

    onError: (_err, _newTodo, context: any) => {
      // Rollback to old cache on error
      queryClient.setQueryData(['todos', filter], context.previousTodos)
    },

    onSettled: async () => {
      await queryClient.invalidateQueries('todos', { exact: false })
    },
  })

  return {
    updateTodo: mutate,
    updatingTodo: isLoading,
    isLoading,
    mutate,
    ...rest,
  }
}

const updateTodoQuery = async (todo: Partial<Todo>) => {
  const res = await fetch(`${TODO_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...todo,
    }),
  })

  return res.json()
}
