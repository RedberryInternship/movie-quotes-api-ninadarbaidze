import express from 'express'
import { addMovie, editMovie, deleteMovie } from 'controllers'
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

router.post('/add-movie', isAuth,  upload.single('image'), addMovie)
router.patch('/edit-movie/:movieId',  upload.single('image'), editMovie)
router.delete('/delete-movie', isAuth, deleteMovie)

export default router
