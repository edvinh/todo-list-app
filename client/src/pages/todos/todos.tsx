import React from 'react'
import { Classes, NonIdealState } from '@blueprintjs/core'
import styled from 'styled-components'
import UpdateWrapper from '../../components/update-wrapper'
import { useFilter } from '../../hooks/use-filter'
import { ErrorResponse, Todo } from '../../types'
import TodoItemSkeleton from '../../components/todo-items-skeleton'
import ListItem from '../../components/list-item'
import TodoList from './todo-list'

const Container = styled.div`
  & > div:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const EmptyState = styled(ListItem).attrs({
  className: Classes.TEXT_MUTED,
})`
  padding: 16px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  text-align: center;
`

interface Props {
  todos?: Todo[]
  isFetchingNextPage: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
  isLoading: boolean
  isFetching: boolean
  error: ErrorResponse | null
}

export default function Todos({
  todos,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isLoading,
  error,
  isFetching,
}: Props) {
  const [filter] = useFilter()

  if (isLoading) {
    return (
      <Container>
        <TodoItemSkeleton />
      </Container>
    )
  }

  if (error) {
    return (
      <EmptyState>
        <NonIdealState
          title="Something went wrong"
          description="Failed to fetch Todos."
          icon="warning-sign"
        />
      </EmptyState>
    )
  }

  if (!todos?.length) {
    return (
      <EmptyState>
        {filter.filter
          ? 'No Todos matched your query.'
          : 'You have no Todos. Try adding some!'}
      </EmptyState>
    )
  }

  return (
    <UpdateWrapper updating={isFetching}>
      <TodoList
        todos={todos}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        error={error}
      />
    </UpdateWrapper>
  )
}
