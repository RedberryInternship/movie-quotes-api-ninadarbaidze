import express from 'express'
import { addMovie, editMovie, deleteMovie, getMovies, getMoviesById, getGenres, addGenres } from 'controllers'
import { isAuth } from 'middlewares'
import multer from 'multer';


const storageConfig = multer.diskStorage({
    destination: function(_req, _file, cb) {
      cb(null, 'images');
    },
    filename: function(_req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  
  const upload = multer({ storage: storageConfig });

const router = express.Router()

router.get('/movies/:userId', isAuth, getMovies)
router.get('/movie/:movieId', getMoviesById)
router.get('/genres', getGenres)
router.post('/add-genres', isAuth, addGenres)
router.post('/add-movie', isAuth,  upload.single('image'), addMovie)
router.patch('/edit-movie/:movieId', isAuth,  upload.single('image'), editMovie)
router.delete('/delete-movie', isAuth, deleteMovie)

export default router
