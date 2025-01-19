import express from "express";
import uploadRoutes from './routes/uploadImagesRoutes.js' 
import loadImagesRoutes from './routes/loadImagesRoutes.js';
import albumRoutes from './routes/albumRoutes.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRoutes);
app.use('/gerenciarmidias', albumRoutes); 
app.use('/', loadImagesRoutes);  


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });