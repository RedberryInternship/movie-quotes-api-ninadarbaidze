import express from 'express'
import { getNotifications } from 'controllers'
import { isAuth } from 'middlewares'

const router = express.Router()

router.get('/notifications',  getNotifications)

export default router
