import React from 'react'
import { H1 } from '@blueprintjs/core'
import styled from 'styled-components'
import TodoInputContainer from './todo-input-container'
import useTodos from '../../hooks/use-todos'
import TodoFilter from './todo-filter'
import Todos from './todos'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 16px;
  & > h1 {
    margin-bottom: 16px;
  }
`

export default function TodosPage() {
  const {
    todos,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useTodos()

  return (
    <Wrapper>
      <Container>
        <H1>My Todos</H1>
        <TodoFilter isFiltering={isFetching} />
        <Todos
          todos={todos}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
        <TodoInputContainer />
      </Container>
    </Wrapper>
  )
}
