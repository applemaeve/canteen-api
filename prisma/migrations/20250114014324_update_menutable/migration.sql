/*
  Warnings:

  - You are about to drop the column `nama_makanan` on the `menu` table. All the data in the column will be lost.
  - Added the required column `nama_menu` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `nama_makanan`,
    ADD COLUMN `nama_menu` VARCHAR(191) NOT NULL;
