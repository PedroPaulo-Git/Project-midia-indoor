import express from "express";
import fs from "fs";
import upload from "../middlewares/uploadMiddleware.js";
import { fileURLToPath } from "url";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//method get to show images that was uploaded in uploads folder
const uploadsDir = path.join(__dirname, "../uploads");

// router.get('/midias', (req, res) => {
//     console.log("trying to acess upload folder")
//     if (!fs.existsSync(uploadsDir)) {
//         return res.status(404).send('Pasta de uploads não encontrada.');
//       }
//     fs.readdir(uploadsDir,(err,files)=>{
//         if(err){
//             return res.status(500).send("erro ao ler pasta de uploads")
//         }
//         const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
//         const imageUrls = imageFiles.map(file => `http://localhost:5000/uploads/${file}`);
//         console.log("folder founded")
//         res.json(imageUrls);
//     })
// });
router.get("/midias", async (req, res) => {
  try {
    const midias = await prisma.midia.findMany();
    res.status(200).json({ success: true, midias });
  } catch (error) {
    console.error("Erro ao listar as mídias:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao listar as mídias." });
  }
});

router.delete("/midias", async (req, res) => {
  const { ids } = req.body; // IDs das mídias a serem deletadas

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "IDs inválidos" });
  }

  try {
    // Deletar as mídias com os IDs fornecidos
    await prisma.midia.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Mídias deletadas com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar mídias:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao deletar as mídias." });
  }
});

export default router;
