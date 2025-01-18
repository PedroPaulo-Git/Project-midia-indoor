import express from 'express';
import uploadController from '../controllers/uploadController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('imagem'), uploadController.uploadImage);

export default router;
