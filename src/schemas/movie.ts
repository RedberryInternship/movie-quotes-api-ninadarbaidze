import { body } from 'express-validator'

const validateMovieForm = () => [
  body('movieNameEN')
    .notEmpty()
    .withMessage('movieNameEN field is required'),
  body('movieNameGE')
    .notEmpty()
    .withMessage('movieNameGE field is required'),
  body('directorEN')
    .notEmpty()
    .withMessage('directorEN field is required'),
  body('directorGE')
    .notEmpty()
    .withMessage('directorGE field is required'),
  body('descriptionGE')
    .notEmpty()
    .withMessage('descriptionGE field is required'),
  body('descriptionEN')
    .notEmpty()
    .withMessage('descriptionEN field is required'),
  body('budget')
    .notEmpty()
    .withMessage('budget field is required'),
  body('userId')
    .notEmpty()
    .withMessage('userId field is required'),
  body('genre')
    .notEmpty()
    .withMessage('genre field is required'),
  // body('image')
  //   .notEmpty()
  //   .withMessage('image field is required'),

 
]

export default validateMovieForm
