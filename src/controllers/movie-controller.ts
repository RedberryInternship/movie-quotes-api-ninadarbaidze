import { Request, Response, NextFunction } from 'express'
import { Movie, User, Genre } from 'models'
import { UserTypes } from 'types'
import { getIO } from '../socket'

export const getMovies = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.find()
      .populate({
        path: 'userId',
        select: ['-__v'],
      })
      .select('-__v')
      .sort({ createdAt: 'descending' })
    res.status(200).json(movies)
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const getMoviesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params

  if (!movieId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  try {
    const movie = await Movie.findById(movieId).select('-__v')

    if (!movie) res.status(404).json({ message: 'Could not find movie' })

    res.status(200).json({
      movie,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const getGenres = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genres = await Genre.find().select(['-__v', '-_id'])
    res.status(200).json(genres)
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const addGenres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label } = req.body

  try {
    const genre = await Genre.create({
      label,
      value: `genres:${label}`,
    })

    res.status(201).json({ message: 'Genre Created!', genre })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

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
    year,
  } = req.body
  const image = req.file!

  try {
    const movie = await Movie.create({
      en: {
        movieName: movieNameEN,
        director: directorEN,
        description: descriptionEN,
      },
      ge: {
        movieName: movieNameGE,
        director: directorGE,
        description: descriptionGE,
      },
      budget,
      year,
      genres: genre,
      userId,
      image: image.path,
    })

    const user = (await User.findById(userId)) as UserTypes | any
    user.movies.push(movie)
    await user.save()

    getIO().emit('movies', { action: 'create', movie: movie })

    res.status(201).json({
      message: 'Movie added successfully',
      movie,
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
) => {
  const { movieId } = req.params

  if (!movieId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

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
    year,
    image,
  } = req.body

  const movieImage = req.file!

  try {
    const movie = await Movie.findById(movieId)

    if (!movie) {
      res.status(404).json({ message: 'Could not find movie' })
    }
    const data = {
      en: {
        movieName: movieNameEN,
        director: directorEN,
        description: descriptionEN,
      },
      ge: {
        movieName: movieNameGE,
        director: directorGE,
        description: descriptionGE,
      },
      budget,
      year,
      genres: genre,
      userId,
      image: image ? movie!.image : movieImage.path,
    }

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, data, {
      new: true,
    })
    res.status(200).json({ message: 'Movie updated!', updatedMovie })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.body
  if (!movieId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  try {
    const movie = await Movie.findById(movieId)
    if (!movie) {
      res.status(404).json({ message: 'Could not find movie' })
    }
    movie!.remove()
    res.status(200).json({ message: 'Movie was deleted successfully' })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
