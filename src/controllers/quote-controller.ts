import { Request, Response, NextFunction } from 'express'
import { Movie, User, Quote } from 'models'
import { UserTypes } from 'types'

export const addQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { quoteEN, quoteGE, movieId, userId } = req.body
  const {  movieId } = req.body
  const image = req.file!

  console.log(req.body)

  try {
    const quote = await Quote.create({
      ...req.body,
      image: image.path
    })

    const movie = (await Movie.findById(movieId)) as UserTypes | any
    movie.quotes.push(quote)
    await movie.save()

    res.status(201).json({
      message: 'Quote added successfully',
      quote,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
