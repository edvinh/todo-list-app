import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { TODO_URL } from '../api'
import { Todo } from '../types'
import { useFilter } from './use-filter'
import { GetTodosResponse } from './use-todos'

const deleteTodoQuery = async (todo: Partial<Todo>) => {
  const res = await fetch(`${TODO_URL}/${todo.id}`, {
    method: 'DELETE',
  })

  return res.json()
}

/**
 * Hook for deleting Todos.
 */
export default function useDeleteTodo() {
  const [filter] = useFilter()

  const queryClient = useQueryClient()

  const { mutate, isLoading, ...rest } = useMutation(deleteTodoQuery, {
    onMutate: (todoToDelete: Todo) => {
      const previousTodos = queryClient.getQueryData<
        InfiniteData<GetTodosResponse>
      >(['todos', filter])

      // Find the Todo and delete it from the cache
      const newTodosPages = previousTodos?.pages.map(page => ({
        ...page,
        todos: page.todos.filter(todo => todo.id !== todoToDelete.id),
      }))

      // Update the cache to reflect the new todo list
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
      // Refetch the todos. Makes no difference in this case but it
      // ensures that we're maintaing a single source of truth
      await queryClient.invalidateQueries('todos', { exact: false })
    },
  })

  return {
    deleteTodo: mutate,
    deletingTodo: isLoading,
    isLoading,
    mutate,
    ...rest,
  }
}
