import express from 'express'
import {  getProfileInfo } from 'controllers'
import { validateUpdateProfile } from 'schemas'
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

router.post('/update-profile', validateUpdateProfile(),  upload.single('image'),)
router.get('/profile/:userId', getProfileInfo)


export default router