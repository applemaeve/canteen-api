/*
  Warnings:

  - You are about to drop the column `foto` on the `stan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stan` DROP COLUMN `foto`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('superadmin', 'admin', 'customer') NOT NULL;
