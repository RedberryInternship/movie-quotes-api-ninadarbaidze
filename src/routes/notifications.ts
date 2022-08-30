import express from 'express'
import { getNotifications, readNotifications, deleteAll } from 'controllers'
import { isAuth } from 'middlewares'

const router = express.Router()

router.get('/notifications',  getNotifications)
router.patch('/read-notifications/:notificationId',  readNotifications)
router.delete('/delete-notifications',  deleteAll)

export default router
