import express from 'express';
import fs from 'fs';
import upload from '../middlewares/uploadMiddleware.js';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//method get to show images that was uploaded in uploads folder
const uploadsDir = path.join(__dirname, '../uploads');

router.get('/midias', (req, res) => {
    console.log("trying to acess upload folder")
    if (!fs.existsSync(uploadsDir)) {
        return res.status(404).send('Pasta de uploads não encontrada.');
      }
    fs.readdir(uploadsDir,(err,files)=>{
        if(err){
            return res.status(500).send("erro ao ler pasta de uploads")
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        const imageUrls = imageFiles.map(file => `http://localhost:5000/uploads/${file}`);
        console.log("folder founded")
        res.json(imageUrls);
    })
});
export default router;