import { body } from 'express-validator'

const validateUpdateProfile = () => [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email.'),

 
]

export default validateUpdateProfile
