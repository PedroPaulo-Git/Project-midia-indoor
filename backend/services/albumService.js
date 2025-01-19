import { prisma } from '../prisma'; // Supondo que você já tenha o Prisma configurado e exportado de 'prisma.js'

export const adicionarMidiaNoAlbum = async (albumId, nomeArquivo, tipo, tamanho, url) => {
  try {
    // Verifique se o álbum existe
    const album = await prisma.album.findUnique({
      where: { id: albumId },
    });

    if (!album) {
      throw new Error('Álbum não encontrado');
    }

    // Crie a nova mídia associada ao álbum
    const novaMidia = await prisma.media.create({
      data: {
        nomeArquivo,
        tipo,
        tamanho,
        url,
        albumId,  // A mídia será associada ao álbum com esse ID
      },
    });

    return novaMidia;
  } catch (error) {
    console.error('Erro ao adicionar mídia:', error);
    throw error;
  }
};
