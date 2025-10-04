import express from 'express';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/', // Save images in 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  resetPassword,
  forgotPassword,
  checkToken,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', getUserProfile);

router.put('/profile', upload.single('profilePic'), updateUserProfile);

router.patch('/change-password', changePassword);

router.post('/forgot-password', forgotPassword);

router.patch('/reset-password', resetPassword);

router.get('/check-token/:token', checkToken);
export default router;
