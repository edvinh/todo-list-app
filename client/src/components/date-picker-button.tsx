import React from 'react'
import { Popover2 } from '@blueprintjs/popover2'
import {
  DatePicker,
  DatePickerProps,
  DatePickerShortcut,
} from '@blueprintjs/datetime'
import { Button, ButtonProps } from '@blueprintjs/core'
import styled from 'styled-components'
import {
  add,
  endOfTomorrow,
  endOfWeek,
  endOfMonth,
  formatDistanceToNow,
} from 'date-fns'

interface Props extends ButtonProps {
  date?: Date | null
  onChange: DatePickerProps['onChange']
}

const DateButton = styled(Button)`
  white-space: nowrap;
`

const now = new Date()

const shortcuts: DatePickerShortcut[] = [
  { date: endOfTomorrow(), label: 'Today' },
  { date: add(endOfTomorrow(), { days: 1 }), label: 'Tomorrow' },
  {
    date: endOfWeek(now),
    label: 'This Week',
  },
  {
    date: add(endOfWeek(now), { weeks: 1 }),
    label: 'Next Week',
  },
  {
    date: endOfMonth(now),
    label: 'This Month',
  },
  {
    date: add(endOfMonth(now), { months: 1 }),
    label: 'Next Month',
  },
]

export default function DatePickerButton({
  date,
  minimal = true,
  rightIcon = 'small-plus',
  intent = 'primary',
  onChange,
  ...rest
}: Props) {
  const buttonLabel = date
    ? formatDistanceToNow(date, { addSuffix: true })
    : 'Add Due Date'

  return (
    <Popover2
      interactionKind="click"
      placement="top"
      content={
        <DatePicker
          timePrecision="minute"
          shortcuts={shortcuts}
          showActionsBar
          minDate={now}
          highlightCurrentDay
          onChange={onChange}
        />
      }
    >
      <DateButton
        minimal={minimal}
        rightIcon={rightIcon}
        intent={intent}
        {...rest}
      >
        {buttonLabel}
      </DateButton>
    </Popover2>
  )
}
