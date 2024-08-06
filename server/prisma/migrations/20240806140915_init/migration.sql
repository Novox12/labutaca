/*
  Warnings:

  - A unique constraint covering the columns `[archivo]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `movies_archivo_key` ON `movies`(`archivo`);
