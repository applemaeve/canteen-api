/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `stan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foto` to the `stan` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `stan` ADD COLUMN `foto` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `siswa_userId_key` ON `siswa`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `stan_userId_key` ON `stan`(`userId`);
