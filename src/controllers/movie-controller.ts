import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Movie } from 'models'

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    genre,
    movieNameEN,
    movieNameGE,
    directorEN,
    directorGE,
    descriptionEN,
    descriptionGE,
    budget,
    userId,
  } = req.body
  const image = req.file!

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errorMessage: errors.array()[0].msg })
  }

  try {
    const user = await Movie.create({
      en: {
        movieName: movieNameEN,
        director: directorEN,
        description:  descriptionEN,
      },
      ge: {
        movieName: movieNameGE,
        director: directorGE,
        description:  descriptionGE,
      },
      budget,
      genres: genre,
      userId,
    //   image: image.path
    })

    
    res.status(200).json({
      message: 'Movie added successfully',
      user
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
export const editMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {}
export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {}
