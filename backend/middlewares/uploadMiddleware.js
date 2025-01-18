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

const upload = multer({storage:storage});
export default upload;