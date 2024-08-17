/*
  Warnings:

  - You are about to drop the column `idioma` on the `user` table. All the data in the column will be lost.
  - Added the required column `idioma_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `tendencia` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `idioma`,
    ADD COLUMN `idioma_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_idioma_id_fkey` FOREIGN KEY (`idioma_id`) REFERENCES `idiomas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
