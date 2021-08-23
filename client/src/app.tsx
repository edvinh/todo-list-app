import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import TodosPage from './pages/todos'
import { Classes } from '@blueprintjs/core'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FilterProvider } from './hooks/use-filter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <div className={Classes.DARK}>
          <TodosPage />
        </div>
      </FilterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
