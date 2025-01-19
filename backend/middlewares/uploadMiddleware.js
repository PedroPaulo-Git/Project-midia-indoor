import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null,fileName);
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv|webm/;
      const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = allowedTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        cb(null, true);
      } else {
        const error = new Error('Somente imagens e vídeos são permitidos!');
        error.status = 400; // Adiciona um status ao erro
        return cb(error); // Passa o erro para o próximo middleware
      }
    },
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
  });
export default upload;