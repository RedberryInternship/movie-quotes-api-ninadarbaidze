import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { swaggerMiddleware } from 'middlewares'
import { connectMongoose } from 'config'
import { signupRoutes } from 'routes'
import cors from 'cors'

const server = express();

dotenv.config()
server.use(bodyParser.json())

server.use('/images', express.static('images'));
connectMongoose()

server.use('/api-docs', swaggerMiddleware() as any)

server.use(cors())

server.use(signupRoutes)

server.listen(process.env.SERVER_PORT || 3001, () =>
  console.log(`Server started at ${process.env.PROJECT_URL}`)
)

