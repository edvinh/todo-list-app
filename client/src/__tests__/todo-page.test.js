import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { QueryClient, QueryClientProvider } from 'react-query'
import TodoPage from '../pages/todos'
import { API_URL } from '../api'
import { FilterProvider } from '../hooks/use-filter'
import GET_TODOS_RESPONSE from './mocks/get-todos-response.json'

const queryClient = new QueryClient()

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <FilterProvider>{children}</FilterProvider>
  </QueryClientProvider>
)

test('renders a todo page', async () => {
  nock(API_URL)
    .get(/todos.*/i)
    .reply(200, GET_TODOS_RESPONSE, {
      'access-control-allow-origin': '*',
    })

  render(<TodoPage />, { wrapper })

  await waitFor(() => {
    expect(screen.getByText(/17\/22 todos completed/i)).toBeInTheDocument()
    expect(screen.getAllByText(/todo\s\d/i).length).toEqual(5)
  })
})
