import { Request, Response, NextFunction } from 'express'
import { User } from 'models'
import bcrypt from 'bcryptjs'

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params

  try {
    const user = await User.findById({ _id: userId }).select([
      'username',
      'profileImage',
      'email',
      'password',
      'emails',
    ])
    res.status(200).json({ user })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, newPassword, emails, email, username } = req.body
  const profileImage = req.file!

  try {
    let reqBody
    let user

    if (emails) {
      const emailList = JSON.parse(emails).map(
        (emails: { email: string }) => emails.email
      )
      const existingUserEmail = await User.find({
        'emails.email': { $in: emailList },
      })
      const existingGoogleUser = await User.find({
        email: { $in: emailList },
      })

      if (existingGoogleUser.length > 0 || existingUserEmail.length > 1) {
        res.status(409).json({
          message: 'Email already exists',
        })
      }
    }

    const existingUser = await User.find({ username })

    if (existingUser.length > 1) {
      res.status(409).json({
        message: 'User already exists',
      })
    }

    if (email) {
      if (!profileImage) {
        reqBody = { username }
      } else {
        reqBody = { username, profileImage: profileImage.path }
      }
      user = await User.findByIdAndUpdate(userId, reqBody, {
        new: true,
      })
    } else {
      if (!profileImage && !newPassword) {
        reqBody = { ...req.body, emails: JSON.parse(emails) }
      } else if (!profileImage && newPassword) {
        const hashedPass = await bcrypt.hash(newPassword, 12)
        reqBody = {
          ...req.body,
          emails: JSON.parse(emails),
          password: hashedPass,
        }
      } else if (profileImage && !newPassword) {
        reqBody = {
          ...req.body,
          emails: JSON.parse(emails),
          profileImage: profileImage.path,
        }
      } else if (profileImage && newPassword) {
        const hashedPass = await bcrypt.hash(newPassword, 12)
        reqBody = {
          ...req.body,
          emails: JSON.parse(emails),
          profileImage: profileImage.path,
          password: hashedPass,
        }
      }
      user = await User.findByIdAndUpdate(userId, reqBody, {
        new: true,
      })
    }

    if (!user) {
      res.status(404).json({
        message: "User doesn't exists",
      })
    }
    await user!.save()

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
