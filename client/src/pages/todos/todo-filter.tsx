import { InputGroup, Spinner, SpinnerSize } from '@blueprintjs/core'
import { debounce } from 'lodash-es'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import FilterButton from '../../components/filter-button'
import { useFilter } from '../../hooks/use-filter'
import { Filter } from '../../types'

const Container = styled.div`
  padding: 0;
  margin-bottom: 4px;
`

const FilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 45px;
  margin-top: 16px;
`

interface Props {
  isFiltering: boolean
}

export default function TodoFilter({ isFiltering }: Props) {
  const [filter, setFilter] = useFilter()

  const onFilterInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(prevFilter => ({
        ...prevFilter,
        filter: evt.target.value,
      }))
    },
    [setFilter]
  )

  const onFilterButtonChange = (newActiveFilter: Filter | null) => {
    setFilter(prevFilter => ({ ...prevFilter, ...newActiveFilter }))
  }

  const debouncedOnFilterInputChange = useMemo(
    () => debounce(onFilterInputChange, 300),
    [onFilterInputChange]
  )

  const showLoadingState = isFiltering && filter.filter

  return (
    <Container>
      <InputGroup
        rightElement={
          showLoadingState ? <Spinner size={SpinnerSize.SMALL} /> : undefined
        }
        onChange={debouncedOnFilterInputChange}
        placeholder="Find a Todo..."
      />
      <FilterButtons>
        <FilterButton
          filterName="title"
          title="Title"
          activeFilter={filter}
          onChange={onFilterButtonChange}
        />
        <FilterButton
          filterName="dueDate"
          title="Due Date"
          activeFilter={filter}
          onChange={onFilterButtonChange}
        />
      </FilterButtons>
    </Container>
  )
}
