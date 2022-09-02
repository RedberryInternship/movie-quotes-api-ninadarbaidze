import { body } from 'express-validator'

const validateSignupForm = () => [
  body('username')
    .notEmpty()
    .withMessage('username field is required')
    .isLength({ min: 3, max: 15 })
    .withMessage('required username length is min: 3, max: 15 characters'),
  body('email')
    .notEmpty()
    .withMessage('email field is required'),
  body('password').notEmpty().withMessage('password field is required'),
]

export default validateSignupForm
