import { body } from 'express-validator'

const updatePassword = () => [
  body('password')
  .notEmpty()
  .withMessage('password field is required'),
 
]

export default updatePassword
