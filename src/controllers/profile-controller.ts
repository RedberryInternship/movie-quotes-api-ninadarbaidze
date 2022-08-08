import {  Request, Response, NextFunction } from 'express';
import { User } from 'models'


export const getProfileInfo =  async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params
  console.log(userId)
    
    try {
        const user = await User.findById({_id: userId})

        res.status(200).json({user})
      } catch (err:any) {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      }
}