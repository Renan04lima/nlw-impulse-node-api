import cors from 'cors'
import express from 'express'
import { setupRoutes } from './routes'

const app = express()
app.use(cors())
setupRoutes(app)

export { app }
