import express from 'express'
import { signup, verifyAccount } from 'controllers'
import { validateSignupForm } from 'schemas'

const router = express.Router()

router.post('/signup', validateSignupForm(), signup)
router.post('/verify-account', verifyAccount)

export default router