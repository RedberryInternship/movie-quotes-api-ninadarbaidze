import bcrypt from 'bcryptjs'
import {  Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { User } from 'models'
import { UserTypes} from 'types'
import jwt from 'jsonwebtoken'
import { sendConfirmationEmail } from 'mail'


const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body as UserTypes
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errorMessage: errors.array()[0].msg })
  }
  try {
    const userExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })

    if (userExists) {
      res.status(409).json({
        message: 'someone with this credentials already exists!',
      })
      return
    }  
    if (emailExists) {
      res.status(409).json({
        message: 'someone with this credentials already exists!',
      })
      return
    }  

    const hashedPass = await bcrypt.hash(password, 12)

    const response = await User.create({
      username,
      email,
      password: hashedPass,
      
    })

    res.status(201).json({
      message: 'User Created Successfully',
      
    })

    //register token
    const token = jwt.sign(
      {
        username: response._id,
      },
      'seriouslysupersecret',
      { expiresIn: '2h' }
    )

    await sendConfirmationEmail(response.username, response.email, token)


  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}


export default signup