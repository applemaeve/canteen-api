/*
  Warnings:

  - You are about to drop the column `Foto` on the `siswa` table. All the data in the column will be lost.
  - Added the required column `alamat` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto` to the `siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `Foto`,
    ADD COLUMN `alamat` TEXT NOT NULL,
    ADD COLUMN `foto` VARCHAR(191) NOT NULL;
