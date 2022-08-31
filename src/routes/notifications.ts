import express from 'express'
import {
  getNotifications,
  readNotifications,
  deleteAll,
  readAllNotifications,
} from 'controllers'
import { isAuth } from 'middlewares'

const router = express.Router()

router.get('/notifications', isAuth, getNotifications)
router.patch('/read-notifications/:notificationId', readNotifications)
router.put('/read-all', readAllNotifications)
router.delete('/delete-notifications', deleteAll)

export default router
