import { Request, Response, NextFunction } from 'express'
import { Movie, User, Quote } from 'models'
import { UserTypes } from 'types'

export const addQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {  movieId } = req.body
  const image = req.file!

  try {
    const quote = await Quote.create({
      ...req.body,
      image: image.path
    })

    const movie = (await Movie.findById(movieId)) as UserTypes | any
    movie.quotes.unshift(quote)
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

export const deleteQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quoteId } = req.body
  if (!quoteId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  try {
    const quote = await Quote.findById(quoteId)
    if (!quote) {
      res.status(404).json({ message: 'Could not find quote' })
    }
    const movie = await Movie.findById(quote?.movieId)

    let index = movie!.quotes.indexOf(quoteId);
    movie!.quotes.splice(index, 1); 
    movie?.save()
    quote!.remove()
    res.status(200).json({ message: 'Quote was deleted successfully' })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}


