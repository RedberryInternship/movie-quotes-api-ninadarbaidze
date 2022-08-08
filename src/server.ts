import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { swaggerMiddleware, errorHandler } from 'middlewares'
import { connectMongoose } from 'config'
import { authRoutes } from 'routes'
import { profileRoutes } from 'routes'
import cors from 'cors'

const server = express();

dotenv.config()
server.use(bodyParser.json())

server.use('/images', express.static('images'));
connectMongoose()

server.use('/api-docs', swaggerMiddleware() as any)

server.use(cors())

server.use(authRoutes)
server.use(profileRoutes)

server.use(errorHandler)

server.listen(process.env.SERVER_PORT || 3001, () =>
  console.log(`Server started at ${process.env.PROJECT_URL}`)
)

