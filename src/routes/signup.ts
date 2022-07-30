import express from 'express'
import { signup } from 'controllers'
import { validateSignupForm } from 'schemas'

const router = express.Router()

router.post('/signup', validateSignupForm(), signup)

export default router