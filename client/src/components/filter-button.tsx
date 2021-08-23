import React from 'react'
import { ButtonProps, Button } from '@blueprintjs/core'
import { Filter } from '../types'

type ExcludedButtonProps = 'intent' | 'rightIcon' | 'onClick'

interface FilterButtonProps extends Omit<ButtonProps, ExcludedButtonProps> {
  title: string
  filterName: 'title' | 'done' | 'dueDate'
  activeFilter?: Filter
  onChange: (activeFilter: Filter | null) => void
}

export default function FilterButton({
  title,
  filterName,
  activeFilter = {},
  onChange,
  ...rest
}: FilterButtonProps) {
  const isActive = activeFilter?.sortBy === filterName
  const order = isActive ? activeFilter?.orderBy ?? null : null

  const handleClick = () => {
    const nextOrderBy = getNextOrderBy(order)

    // Reset activeFilter to null if we set the filter button to null
    if (nextOrderBy === null) {
      return onChange({ sortBy: undefined, orderBy: undefined })
    }

    onChange({ sortBy: filterName, orderBy: nextOrderBy })
  }

  return (
    <Button
      minimal
      small
      intent={order === null ? 'none' : 'primary'}
      rightIcon={getIcon(order)}
      onClick={handleClick}
      {...rest}
    >
      {title}
    </Button>
  )
}

const ORDERS = ['asc', 'desc', null] as const

const getNextOrderBy = (orderBy: 'asc' | 'desc' | null) => {
  const currentOrderIndex = ORDERS.indexOf(orderBy)
  const nextOrderIndex = (currentOrderIndex + 1) % ORDERS.length
  return ORDERS[nextOrderIndex]
}

const getIcon = (orderBy: 'asc' | 'desc' | null) => {
  if (orderBy === null) return 'expand-all'

  return orderBy === 'asc' ? 'chevron-up' : 'chevron-down'
}
