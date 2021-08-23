export interface Todo {
  title: string
  done: boolean
  description: string
  dueDate: number
  id: string
}

export interface Filter {
  sortBy?: 'title' | 'done' | 'dueDate'
  orderBy?: 'asc' | 'desc'
  filter?: string
}

export interface PageInfo {
  count: number
  total: number
  hasNextPage: boolean
  page: number
  totalPages: number
}

interface ErrorEntry {
  msg: string
  param: string
  location: string
}

export interface ErrorResponse {
  error?: string
  errors?: ErrorEntry[]
}
