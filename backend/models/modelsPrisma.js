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
    const albuns = await prisma.album.findMany(); // Utilizando Prisma para buscar os álbuns
    return albuns; // Retorna os álbuns encontrados
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    throw error; // Lança o erro para ser tratado na rota
  }
};

export default { createAlbum,getAlbuns };