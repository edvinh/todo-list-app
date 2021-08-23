import React from 'react'
import TodoItem from '../../components/todo-item'
import useDeleteTodo from '../../hooks/use-delete-todo'
import useUpdateTodo from '../../hooks/use-update-todo'
import { Todo } from '../../types'

interface Props {
  todo: Todo
  onExpandClick: (todo: Todo) => void
  expanded: boolean
}

export default function TodoListItem({ todo, onExpandClick, expanded }: Props) {
  const { updateTodo, updatingTodo } = useUpdateTodo()
  const { deleteTodo } = useDeleteTodo()

  return (
    <TodoItem
      updating={updatingTodo}
      todo={todo}
      onExpandClick={onExpandClick}
      expanded={expanded}
      onChange={updateTodo}
      onDelete={deleteTodo}
    />
  )
}
