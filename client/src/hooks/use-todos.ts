import { isNil, omitBy } from 'lodash-es'
import { useInfiniteQuery } from 'react-query'
import { TODO_URL } from '../api'
import { Filter, ErrorResponse, PageInfo, Todo } from '../types'
import { useFilter } from './use-filter'

interface GetTodosRequestParams extends Filter {
  limit?: number
  offset?: number
}

export interface GetTodosResponse {
  todos: Todo[]
  pageInfo: PageInfo
  metadata: {
    done: number
    active: number
  }
}

const DEFAULT_TODO_LIMIT = 15

/**
 * Hook for fetching and using Todos.
 */
export default function useTodos() {
  const [filter] = useFilter()
  const getTodos = ({ pageParam = 0 }) =>
    getTodosQuery({ ...filter, limit: DEFAULT_TODO_LIMIT, offset: pageParam })

  const { data, ...rest } = useInfiniteQuery<GetTodosResponse, ErrorResponse>(
    ['todos', filter],
    getTodos,
    { getNextPageParam, keepPreviousData: true }
  )

  return {
    todos: data?.pages.flatMap(res => res.todos),
    metadata: data?.pages[0]?.metadata,
    pageInfo: data?.pages[0].pageInfo,
    data,
    ...rest,
  }
}

const getTodosQuery = async (parameters: GetTodosRequestParams) => {
  // Omit null & undefined values
  const filteredParams = omitBy(parameters, isNil)

  // Send as query params
  const queryString = new URLSearchParams(filteredParams).toString()

  return (await fetch(`${TODO_URL}?${queryString}`)).json()
}

function getNextPageParam(lastPage: GetTodosResponse) {
  return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.page : undefined
}
