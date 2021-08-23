import React from 'react'
import styled from 'styled-components'
import { Todo } from '../types'
import {
  Checkbox,
  H4,
  Classes,
  Button,
  Collapse,
  H6,
  Colors,
} from '@blueprintjs/core'
import { formatDistanceToNow } from 'date-fns'
import UpdateWrapper from './update-wrapper'
import ListItem from './list-item'

interface Props {
  todo: Todo
  onChange: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onExpandClick: (todo: Todo) => void
  expanded: boolean
  updating?: boolean
}

interface ExpandedProps {
  $expanded: boolean
}

export default function TodoItem({
  todo,
  onChange,
  onDelete,
  expanded,
  onExpandClick,
  updating,
}: Props) {
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    onChange({
      ...todo,
      done: (evt.target as HTMLInputElement).checked,
    })
  }

  const handleDelete = () => {
    onDelete(todo)
  }

  const handleExpandClick = () => {
    onExpandClick(todo)
  }

  const formattedDate = todo.dueDate
    ? formatDistanceToNow(new Date(todo.dueDate), {
        addSuffix: true,
      })
    : 'No due date'

  return (
    <Container $expanded={expanded}>
      <UpdateWrapper updating={!!updating}>
        <Header>
          <StyledCheckbox large checked={todo.done} onChange={handleChange}>
            <Title checked={todo.done}>{todo.title}</Title>
          </StyledCheckbox>
          <span className={Classes.TEXT_MUTED}>
            <span>{formattedDate}</span>
            <ExpandButton $expanded={expanded} onClick={handleExpandClick} />
          </span>
        </Header>

        <Collapse isOpen={expanded}>
          <Description>
            {todo.description && (
              <>
                <H6>Additional Notes</H6>
                <p>{todo.description}</p>
              </>
            )}
            {!todo.description && (
              <span className={Classes.TEXT_MUTED}>No additional notes.</span>
            )}
          </Description>
          <ActionsContainer>
            <Button minimal intent="danger" onClick={handleDelete}>
              Delete Todo
            </Button>
          </ActionsContainer>
        </Collapse>
      </UpdateWrapper>
    </Container>
  )
}

const Container = styled(ListItem)<ExpandedProps>`
  padding: 0;
  border-radius: ${props => (props.$expanded ? 3 : 0)}px;
  margin: ${props => (props.$expanded ? '12px 0' : 0)}px;

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const Header = styled.div`
  padding: 8px;
  &,
  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const ExpandButton = styled(Button).attrs<ExpandedProps>(props => ({
  minimal: true,
  rightIcon: props.$expanded ? 'chevron-up' : 'chevron-down',
}))<ExpandedProps>`
  margin-left: 16px;
`

const StyledCheckbox = styled(Checkbox)`
  display: flex;
  align-items: center;
  margin: 0;
  .${Classes.CONTROL_INDICATOR} {
    margin-top: 0;
  }
`

const Title = styled(H4)<{ checked: boolean }>`
  margin: 0;
  text-decoration: ${props => (props.checked ? 'line-through' : 'initial')};
`

const Description = styled.div`
  padding: 8px 40px;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
  border-top: 1px solid ${Colors.DARK_GRAY2};
`
