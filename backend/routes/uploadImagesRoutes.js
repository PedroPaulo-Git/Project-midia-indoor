import express from 'express';
import fs from 'fs';
import uploadController from '../controllers/uploadController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

//post / upload images to show in uploads folder
router.post('/', upload.single('imagem'), uploadController.uploadImage);
router.use((err, req, res, next) => {
    if (err) {
      console.error(err.message); // Log do erro no servidor
      return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Ocorreu um erro inesperado.',
      });
    }
    next();
  });


export default router;
