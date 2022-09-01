import bcrypt from 'bcryptjs'
import {  Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { User } from 'models'
import { UserTypes } from 'types'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { sendConfirmationEmail, sendPasswordChangeEmail } from 'mail'



export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body as UserTypes

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errorMessage: errors.array()[0].msg })
  }
  try {
    const existingUser = await User.findOne({ username })
    const existingEmail = await User.findOne({ 'emails.email': email })

    if (existingUser) {
      res.status(409).json({
        message: 'someone with this credentials already exists!',
      })
      return
    }  
    if (existingEmail) {
      res.status(409).json({
        message: 'someone with this credentials already exists!',
      })
      return
    }  

    const hashedPass = await bcrypt.hash(password, 12)

    const response = await User.create({
      username,
      password: hashedPass,
      
    })

    const data = {
      email,
      verified: false,
      primary: true

    }

    const userInfo = await User.findOne({username})
    userInfo!.emails.push(data)

    await userInfo!.save()

    res.status(201).json({
      message: 'User Created Successfully',
      
    })

    const token = jwt.sign(
      {
        userId: response._id,
      },
      process.env.JWT_SEC,
      { expiresIn: '1h' }
    )

    await sendConfirmationEmail(username, email as string, token)


  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => { 
  const {user, password, remember} = req.body

  try {

    const existingUser = await User.findOne(!user.includes('@')? {username: user} : {email: user})

    if(!existingUser) {
      return res.status(404).json({message: 'Please provide correct credentials'})
    }

    const isPasswordEqual = await bcrypt.compare(password, existingUser!.password!)
    
    if(!isPasswordEqual) {
      return res.status(401).json({message: 'Please provide correct credentials'})
    }

    // if(existingUser!.verified === false) {
    //   return res.status(401).json({message: 'You\'re email is not verified, please verify your account first'})
    // }


    const token = jwt.sign(
      { userId: existingUser!._id }, 
      process.env.JWT_SEC_AUTH!, 
      { expiresIn: remember ? '365d' : '6h' })

    res.status(200).json({token, userId: existingUser!._id})

  } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

}


export const authGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, username} = req.body

    const existing = await User.findOne({ email })

    if(existing) {
      const token = jwt.sign({ email, username }, process.env.JWT_SEC_AUTH)

      return res.status(200).json({
        token,
        userId: existing._id
      })
    } else { 
      const googleUser = await User.create({
        email,
        username,        
      })

      await googleUser.updateOne({ verified: true })
  
      res.status(201).json({
        message: 'User Created and verified Successfully',
        
      })
    }

  } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

}


//shesasworebelia esec 

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { token } = req.body
    const { userId } = jwt.verify(token, process.env.JWT_SEC) as JwtPayload
  
    const isTokenExpired = (tok: string) =>
      Date.now() >=
      JSON.parse(Buffer.from(tok.split('.')[1], 'base64').toString()).exp * 1000
  
    if (isTokenExpired(token)) {
      res.status(401).json({ message: 'Your Token is Expired' })
      return
    }
  
    const user = await User.findOne({ _id: userId })
  
    if(!user) {
      res.status(404).json({ message: 'Unfortunately user doesn\'t exists' })
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


export const passwordRecovery = async (req: Request, res: Response, next: NextFunction) => {
 const { email } = req.body
 try {
   const existingUser = await User.findOne({ 'emails.email': email })  

   if(!existingUser) {
    res.status(404).json({ message: 'Unfortunately user doesn\'t exists' })
    return
  }

  const verifiedUser = existingUser?.emails.filter(emails => {
    return emails.email === email && emails.verified === true
  })

  if(verifiedUser.length === 0) {
    res.status(403).json({ message: 'This email isn\'t verified' })
    return
  }
    
  res.status(200).json({
        message: 'Password recovery link is sent',
        
  })
    const token = jwt.sign({ email }, process.env.JWT_SEC_PASS,  { expiresIn: '1h' })
  
    await sendPasswordChangeEmail(existingUser.username, email, token)
 
 } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }  



}


export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
 const {password, token} = req.body 
 const errors = validationResult(req)
 
 if (!errors.isEmpty()) {
    return res.status(422).json({ errorMessage: errors.array()[0].msg })
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SEC_PASS) as JwtPayload
    const existingUser = await User.findOne({ 'emails.email': email })

    if(!password) {
      return res.status(404).json({
        message: 'Something went wrong, please check your registration method',
      })
    }

    const isTokenExpired = (tok: string) =>
    Date.now() >=
    JSON.parse(Buffer.from(tok.split('.')[1], 'base64').toString()).exp * 1000

    if (isTokenExpired(token)) {
      res.status(401).json({ message: 'Your Token is Expired' })
    }
    
    const hashedPass = await bcrypt.hash(password, 12)

    await existingUser!.updateOne({ password: hashedPass })

    res.status(200).json({
      message: 'Password is updated'
    })

  } catch(err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

}

