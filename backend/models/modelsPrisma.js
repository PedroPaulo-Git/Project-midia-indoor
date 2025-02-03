import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createAlbum(nome, descricao) {
  return await prisma.album.create({
    data: {
      nome,
      descricao,
    },
  });
}

export const getAlbuns = async () => {
  try {
    const albuns = await prisma.album.findMany({
      include: { midias: true }, // Inclui as mídias associadas
    }); 
    return albuns; // Retorna os álbuns encontrados
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    throw error; // Lança o erro para ser tratado na rota
  }
};


export async function atualizarMidiasDoAlbum(albumId, midias) {
  try {
    const albumExiste = await prisma.album.findUnique({
      where: { id: albumId },
      include: { midias: true },
    });

    if (!albumExiste) {
      throw new Error('Álbum não encontrado.');
    }

    // Pegamos os IDs das mídias que já estão associadas ao álbum
    const midiasAtuaisIds = albumExiste.midias.map(midia => midia.id);

    // Filtramos apenas as mídias que ainda não estão associadas ao álbum
    const midiasNovas = midias.filter(midia => !midiasAtuaisIds.includes(midia.id));

    if (midiasNovas.length === 0) {
      return albumExiste; // Se não há novas mídias, retornamos o álbum sem alterar nada
    }

    return await prisma.album.update({
      where: { id: albumId },
      data: {
        midias: {
          connect: midiasNovas.map(midia => ({ id: midia.id })),
        },
      },
      include: { midias: true },
    });

  } catch (error) {
    console.error('Erro ao associar mídias:', error);
    throw new Error('Erro ao atualizar mídias do álbum.');
  }
}










export default { createAlbum,getAlbuns,atualizarMidiasDoAlbum };