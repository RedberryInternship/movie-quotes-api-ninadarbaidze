import {  Request, Response, NextFunction } from 'express';
import { User } from 'models'
import bcrypt from 'bcryptjs'



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
  const profileImage = req.file!

  try {
    let reqBody
    let hashedPass
    if(password) {
       hashedPass = await bcrypt.hash(password, 12)
    }

      if(!profileImage && !password) {
        reqBody = { username, email }
      } else if (!profileImage) {
        reqBody = { username, email, password: hashedPass }
      } else if(!password) {
        reqBody = { username, email, profileImage: profileImage.path }
      }
    
     
    const user = await User.findByIdAndUpdate(
      userId,
      reqBody,
      {
        new: true,
      }
    )      

    await user!.save()
    res.status(200).json({
      message: 'Profile updated successfully'
    })
  } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}