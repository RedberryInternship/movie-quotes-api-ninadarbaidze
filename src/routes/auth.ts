import express from 'express'
import { signup, verifyAccount, authGoogle, passwordRecovery, updatePassword, login } from 'controllers'
import { validateSignupForm, validateLoginForm } from 'schemas'

const router = express.Router()

// router.post('/signup', validateSignupForm(), signup)
router.post('/signup',  signup)
router.post('/login', validateLoginForm(), login)
router.post('/auth-google',  authGoogle)
router.post('/verify-account', verifyAccount)
router.post('/password-recovery', passwordRecovery)
router.post('/update-password', updatePassword)

export default router