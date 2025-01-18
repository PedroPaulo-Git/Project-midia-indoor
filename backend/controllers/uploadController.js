const uploadController = {
    uploadImage: (req, res) => {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada.' });
      }
  
      // Caminho do arquivo salvo no servidor
      const imagePath = `uploads/${req.file.filename}`;
      return res.json({ success: true, imagePath });
    }
  };
  
  export default uploadController;