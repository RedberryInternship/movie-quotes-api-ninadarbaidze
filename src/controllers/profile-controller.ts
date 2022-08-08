import {  Request, Response, NextFunction } from 'express';
import { User } from 'models'


export const getProfileInfo =  async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params
    
    try {
        const user = await User.findById({_id: userId}).select(['email', 'username', 'profileImage'])
        res.status(200).json({user})
      } catch (err:any) {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      }
}


export const updateProfile =  async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password, userId} = req.body
  const profileImagePath = req.file!

  try {

    const user = await User.findByIdAndUpdate(
      userId,
      {profileImage: profileImagePath.path, username, email, password},
      {
        new: true,
      }
    )      

    await user!.save()
    res.status(200).json({
      message: 'Profile updated successfully', user
    })
  } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}