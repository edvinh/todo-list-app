import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { PORT, CLIENT_URL } from './constants'
import todosRouter from './routes/todos'
import TodosService from './services/todos-service'

// Optional seed for initial mock data
// import mockTodos from './seeds/todos-seed'

const app = express()

const corsOptions = {
  origin: CLIENT_URL,
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

const todosService = new TodosService(/* mockTodos */)
app.use('/todos', todosRouter(todosService))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
