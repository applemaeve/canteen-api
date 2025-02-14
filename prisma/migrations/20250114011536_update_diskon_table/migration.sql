/*
  Warnings:

  - Added the required column `stanId` to the `diskon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diskon` ADD COLUMN `stanId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `diskon` ADD CONSTRAINT `diskon_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
