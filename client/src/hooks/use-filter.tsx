import { noop } from 'lodash-es'
import React, { useContext, useState } from 'react'
import { Filter } from '../types'

interface FilterProviderProps {
  initialFilter?: Filter
  children: React.ReactChild
}

type FilterValueType = [Filter, React.Dispatch<React.SetStateAction<Filter>>]

export const FilterContext = React.createContext<FilterValueType>([{}, noop])

/**
 * The FilterProvider provides a context that holds the filter applied when fetching Todos.
 * It exposes a filter and a filter update function.
 */
export const FilterProvider = ({
  initialFilter = {},
  children,
}: FilterProviderProps) => {
  const [filter, setFilter] = useState<Filter>(initialFilter)

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {children}
    </FilterContext.Provider>
  )
}

/** Filter context hook. */
export function useFilter() {
  return useContext(FilterContext)
}
