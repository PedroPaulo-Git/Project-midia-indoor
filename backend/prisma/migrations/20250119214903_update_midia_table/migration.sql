/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_albumId_fkey";

-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "Midia" (
    "id" SERIAL NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "albumId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Midia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Midia" ADD CONSTRAINT "Midia_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
