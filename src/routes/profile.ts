import express from 'express'
import {  getProfileInfo, updateProfile } from 'controllers'
import { validateUpdateProfile } from 'schemas'
import multer from 'multer';
import { isAuth } from 'middlewares'


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

router.post('/update-profile', isAuth, validateUpdateProfile(),  upload.single('image'), updateProfile)
router.get('/profile/:userId', isAuth, getProfileInfo)


export default router