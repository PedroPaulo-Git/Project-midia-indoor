import express from 'express'
import { createAlbum } from '../models/modelsPrisma.js'
import { getAlbuns } from '../models/modelsPrisma.js'
import { atualizarMidiasDoAlbum } from '../models/modelsPrisma.js'
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
// rota pra dar post em midias em certo album
router.post('/albuns/:albumId/midias', async (req, res) => {
    const { albumId } = req.params;
    const { nomeArquivo, tipo, tamanho, url } = req.body;
  
    try {
      const novaMidia = await adicionarMidiaNoAlbum(Number(albumId), nomeArquivo, tipo, tamanho, url);
      res.status(201).json(novaMidia); // Retorna a mídia criada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar mídia ao álbum' });
    }
  });

// Rota para atualizar as mídias de um álbum existente
router.put('/albuns/:albumId/midias', async (req, res) => {
  const { albumId } = req.params;
  const { midias } = req.body; // Espera um array de mídias

  try {
      const albumAtualizado = await atualizarMidiasDoAlbum(Number(albumId), midias);
      res.status(200).json(albumAtualizado);
  } catch (error) {
      console.error('Erro ao atualizar mídias do álbum:', error);
      res.status(500).json({ error: 'Erro ao atualizar mídias do álbum' });
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