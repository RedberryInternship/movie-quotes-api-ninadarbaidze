import { body } from 'express-validator'

const validateLoginForm = () => [
  body('user')
    .notEmpty()
    .withMessage('user mail or username is required')
    .isLength({ min: 3 })
    .withMessage('required username length is min: 3 chars'),
 
  body('password')
  .notEmpty()
  .withMessage('password field is required'),
 
]

export default validateLoginForm
