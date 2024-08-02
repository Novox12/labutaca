-- CreateTable
CREATE TABLE `idiomas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idioma` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `archivo` VARCHAR(191) NOT NULL,
    `miniatura` VARCHAR(191) NOT NULL,
    `idioma_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_idioma_id_fkey` FOREIGN KEY (`idioma_id`) REFERENCES `idiomas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
