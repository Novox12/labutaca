/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `movies_titulo_key` ON `movies`(`titulo`);
