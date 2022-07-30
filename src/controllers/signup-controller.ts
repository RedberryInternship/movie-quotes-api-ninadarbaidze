import bcrypt from 'bcryptjs'
import {  Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { User } from 'models'
import { UserTypes} from 'types'


const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body as UserTypes
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errorMessage: errors.array()[0].msg })
  }
  try {
    const user = await User.findOne({ username }) as UserTypes
    if (!user)
      res
        .status(401)
        .json({ errorMessage: 'Please provide correct credentials' })

    const hashedPass = await bcrypt.hash(password, 12)

    await User.create({
      username,
      email,
      password: hashedPass,
      
    })
    res.status(201).json({
      message: 'User Created Successfully',
      
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}


export default signup