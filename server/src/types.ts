export interface Todo {
  id?: string
  title: string
  description: string
  dueDate: number
  done: boolean
}

export interface TodoFilter {
  sortBy?: 'title' | 'done' | 'dueDate'
  orderBy?: 'asc' | 'desc'
  filter?: string
  limit: number
  offset: number
  state?: 'done' | 'active'
}
