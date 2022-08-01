import bcrypt from 'bcryptjs'
import {  Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { User } from 'models'
import { UserTypes } from 'types'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { sendConfirmationEmail } from 'mail'


export const signup = async (req: Request, res: Response, next: NextFunction) => {
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

    const token = jwt.sign(
      {
        userId: response._id,
      },
      process.env.JWT_SEC!,
      { expiresIn: '1h' }
    )

    await sendConfirmationEmail(response.username, response.email, token)


  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { token } = req.body
    const { userId } = jwt.verify(token, process.env.JWT_SEC!) as JwtPayload
  
    const isTokenExpired = (tok: string) =>
      Date.now() >=
      JSON.parse(Buffer.from(tok.split('.')[1], 'base64').toString()).exp * 1000
  
    if (isTokenExpired(token)) {
      res.status(401).json({ message: 'Your Token is Expired' })
      return
    }
  
    const user = await User.findOne({ _id: userId })
  
    if(!user) {
      res.status(404).json({ message: 'Unfortunately user doesn/t exists' })
      return
    }
  
    await user.updateOne({ verified: true })
    res.status(200).json({message: 'Your account is verified'})

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

}


