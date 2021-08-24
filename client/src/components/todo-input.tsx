import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
  ControlGroup,
  InputGroup,
  Button,
  TextArea,
  Classes,
  Collapse,
} from '@blueprintjs/core'
import { Todo } from '../types'
import ListItem from './list-item'
import DatePickerButton from './date-picker-button'

interface Props {
  isAdding?: boolean
  onAdd: () => void
  onTitleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void
  onDateChange: (date: Date) => void
  done?: number
  total?: number
  todo: Partial<Todo>
}

export default function TodoInput({
  isAdding,
  done,
  total,
  onAdd,
  onTitleChange,
  onDescriptionChange,
  onDateChange,
  todo,
}: Props) {
  const [addNotes, setAddNotes] = useState(false)
  const todoInputRef = useRef<HTMLInputElement>(null)

  const todosCompletedText =
    (done || total) && `${done || 0}/${total || 0} todos completed`

  const onKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && todo.title) {
      onAdd()
      todoInputRef.current?.focus()
    }
  }

  return (
    <Container>
      <Content>
        <ControlGroup fill>
          <InputGroup
            placeholder="Add Todo..."
            fill
            value={todo.title || ''}
            onChange={onTitleChange}
            onKeyDown={onKeyDown}
            inputRef={todoInputRef}
          />
          <Button
            loading={isAdding}
            disabled={!todo.title}
            icon="add"
            onClick={onAdd}
          >
            Add
          </Button>
        </ControlGroup>
        <BottomContainer>
          <span className={Classes.TEXT_MUTED}>{todosCompletedText || ''}</span>
          <ActionsContainer>
            <Button
              small
              minimal
              icon={addNotes ? 'remove' : 'add'}
              onClick={() => setAddNotes(!addNotes)}
            >
              {addNotes ? 'Hide additional notes' : 'Add additional notes'}
            </Button>
            <DatePickerButton
              disabled={isAdding}
              icon="time"
              rightIcon={null}
              small
              onChange={onDateChange}
              date={todo.dueDate ? new Date(todo.dueDate) : null}
            />
          </ActionsContainer>
        </BottomContainer>
        <Collapse isOpen={addNotes}>
          <StyledTextArea
            disabled={isAdding}
            value={todo.description || ''}
            onChange={onDescriptionChange}
            placeholder="Additional notes..."
            fill
          />
        </Collapse>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  /* box-shadow hack */
  overflow: hidden;
  padding-top: 16px;
  margin-top: -16px;

  position: sticky;
  bottom: 0;

  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`

const Content = styled(ListItem)`
  && {
    box-shadow: 0px 21px 15px 17px #111;
  }
`

const ActionsContainer = styled.div`
  & > button {
    margin-right: 8px;
  }
`

const BottomContainer = styled.div`
  display: flex;
  padding-top: 8px;
  justify-content: space-between;

  > span {
    padding: 4px;
  }
`

const StyledTextArea = styled(TextArea)`
  margin-top: 8px;
  min-width: 100%;
  min-height: 50px;
`
