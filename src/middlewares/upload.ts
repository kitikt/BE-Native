// src/middlewares/upload.ts
import multer from 'multer';
import { storage } from '~/config/cloudinary';

const upload = multer({ storage });

export default upload;
