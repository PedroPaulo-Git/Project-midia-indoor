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
    console.log("🔹 Função atualizarMidiasDoAlbum chamada!");
    console.log("🔹 Álbum ID:", albumId);
    console.log("🔹 Mídias recebidas:", midias);

    if (!Array.isArray(midias)) {
      throw new Error("🚨 O parâmetro 'midias' não é um array!");
    }

    const albumExiste = await prisma.album.findUnique({
      where: { id: albumId },
      include: { midias: true },
    });

    if (!albumExiste) {
      console.log("🚨 Álbum não encontrado no banco!");
      throw new Error('Álbum não encontrado.');
    }

    console.log("✅ Álbum encontrado:", albumExiste);
    let updateData = {};

    if (midias.length > 0) {
      // Se houver mídias, faz a conexão
      const midiasNovas = midias.map(midia => ({ id: midia.id }));
      console.log("🔹 Mídias formatadas para o Prisma:", midiasNovas);
      updateData.midias = { connect: midiasNovas };
    } else {
      // Se não houver mídias, faz o disconnect
      console.log("🔹 Desconectando todas as mídias:", albumExiste.midias.map(midia => midia.id));
      updateData.midias = { disconnect: albumExiste.midias.map(midia => ({ id: midia.id })) };
    }
    

    const albumAtualizado = await prisma.album.update({
      where: { id: albumId },
      data: updateData,
      include: { midias: true },
    });
    
    console.log("✅ Álbum atualizado com as mídias:", albumAtualizado.midias); // Verifique as mídias no retorno    
    return albumAtualizado;

  } catch (error) {
    console.error('❌ Erro ao associar mídias:', error);
    throw new Error('Erro ao atualizar mídias do álbum.');
  }
}



export default { createAlbum,getAlbuns,atualizarMidiasDoAlbum };