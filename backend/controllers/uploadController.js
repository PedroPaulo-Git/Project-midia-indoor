const uploadController = {
    uploadImage: (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: 'Nenhum arquivo foi enviado. Por favor, selecione uma imagem ou vídeo.',
          });
        }
      const fileUrl = `/uploads/${req.file.filename}`;

      return res.status(200).json({
        success: true,
        message: 'Upload realizado com sucesso!',
        fileUrl, // URL para acessar o arquivo
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