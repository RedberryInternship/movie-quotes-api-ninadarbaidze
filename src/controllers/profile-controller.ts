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
  const { password, userId, newPassword, emails } = req.body
  const profileImage = req.file!

  try {
    let reqBody
    let hashedPass

    // if (!profileImage && !password) {
    //   reqBody = { username, emails }
    // } else if (!profileImage) {
    //   reqBody = { username, emails, password: hashedPass }
    // } else if (!password) {
    //   reqBody = { username, emails, profileImage: profileImage.path }
    // }
    const emailList = emails.map(
      (existingEmail: { email: string }) => existingEmail.email
    )
    let findDuplicates = emailList.filter(
      (item: string, index: number) => emailList.indexOf(item) != index
    )

    if (findDuplicates.length > 0) {
      res.status(403).json({
        message: 'One of the emails already exists',
      })
    }

    if (password) {
      hashedPass = await bcrypt.hash(password, 12)
    }

    if (!profileImage && !newPassword) {
      reqBody = { ...req.body, password: hashedPass }
    } else if (!profileImage && newPassword) {
      const hashedPass = await bcrypt.hash(newPassword, 12)
      reqBody = { ...req.body, password: hashedPass }
    } else if (profileImage && !newPassword) {
      reqBody = {
        ...req.body,
        profileImage: profileImage.path,
        password: hashedPass,
      }
    } else if (profileImage && newPassword) {
      const hashedPass = await bcrypt.hash(newPassword, 12)
      reqBody = {
        ...req.body,
        profileImage: profileImage.path,
        password: hashedPass,
      }
    }

    const user = await User.findByIdAndUpdate(userId, reqBody, {
      new: true,
    })

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
