import React, { useState } from 'react'
import { Todo } from '../../types'
import useTodos from '../../hooks/use-todos'
import useAddTodo from '../../hooks/use-add-todo'
import TodoInput from '../../components/todo-input'

export default function TodoInputContainer() {
  const { metadata, pageInfo } = useTodos()
  const { addTodo, addingTodo } = useAddTodo()

  const [todo, setTodo] = useState<Partial<Todo>>({})

  const handleAdd = () => {
    addTodo(todo)
    setTodo({})
  }

  const handleDateChange = (selectedDate: Date) =>
    setTodo(oldTodo => ({ ...oldTodo, dueDate: selectedDate.getTime() }))

  const handleTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(oldTodo => ({ ...oldTodo, title: evt.target.value }))

  const handleDescriptionChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => setTodo(oldTodo => ({ ...oldTodo, description: evt.target.value }))

  return (
    <TodoInput
      isAdding={addingTodo}
      done={metadata?.done}
      total={pageInfo?.total}
      onAdd={handleAdd}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      onDateChange={handleDateChange}
      todo={todo}
    />
  )
}
