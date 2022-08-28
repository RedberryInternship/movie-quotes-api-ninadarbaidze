import { Request, Response, NextFunction } from 'express'
import { Movie, Quote } from 'models'
import { UserTypes } from 'types'
import { getIO } from 'socket'

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

    const newQuote = await Quote.findById(quote._id)
      .populate({
        path: 'comments.userId',
        select: ['username', 'profileImage'],
      })
      .populate({
        path: 'userId',
        // select: ['en.movieName', 'ge.movieName', 'year'],
      })
      .populate({
        path: 'movieId',
        select: ['en.movieName', 'ge.movieName', 'year'],
      })

    getIO().emit('quotes', { action: 'create', quote: newQuote })

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
    await quote!.remove()
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

  if (!quoteId.match(/^[0-9a-fA-F]{24}$/))
    res.status(422).json({ message: 'Please provide a valid id' })

  try {
    const quote = await Quote.findById(quoteId)
      .populate({
        path: 'comments.userId',
        select: ['username', 'profileImage'],
      })
      .select('-__v')

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

export const getQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt((req.query.page as string) || '0')
  const PAGE_SIZE = 3
  try {
    const quotes = await Quote.find()
      .populate({
        path: 'comments.userId',
        select: ['username', 'profileImage'],
      })
      .populate({
        path: 'movieId',
        select: ['en.movieName', 'ge.movieName', 'year'],
      })
      .populate({
        path: 'userId',
        select: ['username', 'profileImage'],
      })
      .select('-__v')
      .sort({ createdAt: 'descending' })
      .limit(PAGE_SIZE * page)
    const total = await Quote.countDocuments()

    res.status(200).json({ quotes, total })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const searchQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { queryName, queryType } = req.query

  const searchInMovies = queryType === 'movies'

  const regex = new RegExp(queryName as string, 'i')
  const page = parseInt((req.query.page as string) || '0')
  const PAGE_SIZE = 3

  console.log(queryName, queryType)

  try {
    const movies = await Movie.find({
      $or: [
        { 'en.movieName': { $regex: regex } },
        { 'ge.movieName': { $regex: regex } },
      ],
    }).select('quotes')
    const quoteIds = movies[0].quotes

    const quotes = 
        await Quote.find(searchInMovies ? {
          _id: { $in: quoteIds },
        }: {
          $or: [{ quoteEN: { $regex: regex } }, { quoteGE: { $regex: regex } }],
        })

          .populate({
            path: 'comments.userId',
            select: ['username', 'profileImage'],
          })
          .populate({
            path: 'movieId',
            select: ['en.movieName', 'ge.movieName', 'year'],
          })
          .populate({
            path: 'userId',
            select: ['username', 'profileImage'],
          })
          .select('-__v')
          .sort({ createdAt: 'descending' })
          .limit(PAGE_SIZE * page)

    const total = quotes.length

    res.status(200).json({ quotes, total })
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

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quoteId, userId, comment } = req.body

  try {
    const quote = await Quote.findById(quoteId).populate({
      path: 'userId',
      select: ['username', 'profileImage'],
    })
    const commentData = {
      comment,
      userId,
    }

    quote!.comments.push(commentData)
    await quote!.save()

    const newQuote = await Quote.findById(quoteId)
      .populate({
        path: 'comments.userId',
        select: ['username', 'profileImage'],
      })
      .populate({
        path: 'movieId',
        select: ['en.movieName', 'ge.movieName', 'year'],
      })

    // getIO().emit('comment', { action: 'addComment', comment: newQuote!.comments[quote!.comments.length - 1], quantity: newQuote?.comments.length })
    getIO().emit('quotes', { action: 'addComment', quote: newQuote })
    res.status(201).json({
      message: 'Comment added successfully',
      quote,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const addLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quoteId, userId } = req.body

  try {
    const quote = await Quote.findById(quoteId)
    const alreadyLiked = quote?.likes.find((user) => user.toString() === userId)

    if (alreadyLiked) {
      let index = quote!.likes.indexOf(userId)
      quote?.likes.splice(index, 1)
      await quote?.save()
      getIO().emit('quotes', {
        action: 'dislike',
        likes: quote!.likes,
        id: quote!._id,
      })

      res.status(201).json({
        message: 'Unliked successfully',
        quote,
      })
    } else {
      quote!.likes.push(userId)
      await quote!.save()
      getIO().emit('quotes', {
        action: 'like',
        likes: quote!.likes,
        id: quote!._id,
      })
    }

    res.status(201).json({
      message: 'Liked successfully',
      quote,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
