import express from 'express'
import { createAlbum } from '../models/modelsPrisma.js'
import { getAlbuns } from '../models/modelsPrisma.js'
const router = express.Router();

// Rota para criar um novo álbum
router.post('/albuns', async (req, res) => {
    console.log(req.body);
  const { nome, descricao } = req.body;

  try {
    const album = await createAlbum(nome, descricao);
    res.status(201).json(album); // Retorna o álbum criado
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    res.status(500).json({ error: 'Erro ao criar álbum' });
  }
});
router.get('/albuns', async (req, res) => {
    try {
      const albuns = await getAlbuns(); // Chamando a função para buscar álbuns
      if (!albuns || albuns.length === 0) {
        return res.status(404).json({ message: 'Nenhum álbum encontrado' });
      }
      res.status(200).json(albuns); // Retorna os álbuns encontrados
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
      res.status(500).json({ error: 'Erro ao buscar álbuns' });
    }
  });

export default router;