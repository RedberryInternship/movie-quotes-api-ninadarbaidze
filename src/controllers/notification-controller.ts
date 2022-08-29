import { Request, Response, NextFunction } from 'express'
import { Notification, Quote } from 'models'
import { getIO } from 'socket'

export const getNotifications = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await Notification.find()
      .populate({
        path: 'senderId',
        select: ['username', 'profileImage'],
      })
      .sort({ createdAt: 'descending' })

    res.status(200).json(notifications)
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
