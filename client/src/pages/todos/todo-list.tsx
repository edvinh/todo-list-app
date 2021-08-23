import React, { useState } from 'react'
import FetchMoreButton from '../../components/fetch-more-button'
import ListItem from '../../components/list-item'
import { ErrorResponse, Todo } from '../../types'
import TodoListItem from './todo-list-item'

interface Props {
  todos?: Todo[]
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
  fetchNextPage: () => void
  error: ErrorResponse | null
}

export default function TodoList({
  todos,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: Props) {
  const [expandedTodo, setExpandedTodo] = useState<Todo | null>(null)

  const handleExpandClick = (todo: Todo) => {
    if (todo.id === expandedTodo?.id) {
      setExpandedTodo(null)
      return
    }

    setExpandedTodo(todo)
  }

  return (
    <>
      {todos?.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          expanded={expandedTodo?.id === todo.id}
          onExpandClick={handleExpandClick}
        />
      ))}
      <ListItem>
        <FetchMoreButton
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onClick={() => fetchNextPage()}
        />
      </ListItem>
    </>
  )
}
