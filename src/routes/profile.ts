import express from 'express'
import {  getUserInfo, updateProfile } from 'controllers'
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

router.put('/update-profile', isAuth, validateUpdateProfile(),  upload.single('image'), updateProfile)
router.get('/user/:userId', isAuth, getUserInfo)


export default router