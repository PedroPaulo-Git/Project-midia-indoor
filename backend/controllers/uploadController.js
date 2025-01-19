import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const uploadController = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Nenhum arquivo foi enviado. Por favor, selecione uma imagem ou vídeo.',
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      // Inserir as informações da mídia no banco de dados usando Prisma
      const newMidia = await prisma.midia.create({
        data: {
          nomeArquivo: req.file.filename,
          url: fileUrl,
          tipo: req.file.mimetype,
          tamanho: req.file.size, 
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Upload realizado com sucesso!',
        fileUrl, // URL para acessar o arquivo
        newMidia, // Dados da mídia armazenada no banco
      });
    }catch (error) {
        console.error('Erro no upload:', error);
       // const imagePath = `uploads/${req.file.filename}`;
        return res.status(500).json({
          success: false,
          message: 'Ocorreu um erro no servidor durante o upload. Tente novamente mais tarde.',
        });
      }
      
    }
  };
  
  export default uploadController;