-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "tipo" TEXT,
    "tamanho" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "dataUpload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
