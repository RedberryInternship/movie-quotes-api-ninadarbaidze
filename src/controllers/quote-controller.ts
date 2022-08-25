import { Request, Response, NextFunction } from 'express'
import { Movie, Quote } from 'models'
import { UserTypes } from 'types'

export const addQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.body
  const image = req.file!

  try {
    const quote = await Quote.create({
      ...req.body,
      image: image.path,
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

    let index = movie!.quotes.indexOf(quoteId)
    movie!.quotes.splice(index, 1)
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

export const getQuoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quoteId } = req.params
  console.log(quoteId)

  if (!quoteId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  try {
    const quote = await Quote.findById(quoteId).select('-__v')

    if (!quote) res.status(404).json({ message: 'Could not find quote' })

    res.status(200).json({
      quote,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const editQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quoteId } = req.params

  if (!quoteId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  const { quoteEN, quoteGE, image } = req.body

  const quoteImage = req.file!

  try {
    const quote = await Quote.findById(quoteId)

    if (!quote) {
      res.status(404).json({ message: 'Could not find quote' })
    }
    const data = {
      quoteEN,
      quoteGE,
      image: image ? quote!.image : quoteImage.path,
    }

    const updatedQuote = await Quote.findByIdAndUpdate(quoteId, data, {
      new: true,
    })
    res.status(200).json({ message: 'Quote updated!', updatedQuote })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
