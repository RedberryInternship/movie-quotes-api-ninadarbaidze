import express from 'express'
import { getNotifications, readNotifications } from 'controllers'
import { isAuth } from 'middlewares'

const router = express.Router()

router.get('/notifications',  getNotifications)
router.patch('/read-notifications/:notificationId',  readNotifications)

export default router
