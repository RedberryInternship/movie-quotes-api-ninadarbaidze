import express from 'express'
import { addQuote, deleteQuote, getQuoteById, editQuote, addComment, addLike, getQuotes, searchQuotes } from 'controllers'
import { isAuth } from 'middlewares'
import multer from 'multer'

const storageConfig = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'images')
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storageConfig })

const router = express.Router()

router.get('/quotes', getQuotes)
router.get('/search-quotes', searchQuotes)
router.get('/quote/:quoteId', getQuoteById)
router.post('/add-quote', upload.single('image'), addQuote)
router.patch('/edit-quote/:quoteId', isAuth, upload.single('image'), editQuote)
router.delete('/delete-quote', deleteQuote)

router.post('/add-comment', addComment)
router.post('/add-like', addLike)

export default router
