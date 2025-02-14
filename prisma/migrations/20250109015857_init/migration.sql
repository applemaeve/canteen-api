-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('admin', 'customer') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nama_siswa` VARCHAR(191) NOT NULL,
    `telp` INTEGER NOT NULL,
    `Foto` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stan` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nama_stan` VARCHAR(191) NOT NULL,
    `nama_pemilik` VARCHAR(191) NOT NULL,
    `telp` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskon` (
    `id` VARCHAR(191) NOT NULL,
    `nama_diskon` VARCHAR(191) NOT NULL,
    `persentase` DOUBLE NOT NULL DEFAULT 0,
    `tanggal_awal` DATETIME(3) NOT NULL,
    `tanggal_akhir` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_diskon` (
    `id` VARCHAR(191) NOT NULL,
    `diskonId` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` VARCHAR(191) NOT NULL,
    `stanId` VARCHAR(191) NOT NULL,
    `nama_makanan` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL DEFAULT 0,
    `jenis` ENUM('Makanan', 'Minuman') NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 0,
    `deskripsi` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `stanId` VARCHAR(191) NOT NULL,
    `siswaId` VARCHAR(191) NOT NULL,
    `status` ENUM('pesanan_diterima', 'dimasak', 'diantar', 'sampai') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_transaksi` (
    `id` VARCHAR(191) NOT NULL,
    `transaksiId` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stan` ADD CONSTRAINT `stan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_diskon` ADD CONSTRAINT `menu_diskon_diskonId_fkey` FOREIGN KEY (`diskonId`) REFERENCES `diskon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_diskon` ADD CONSTRAINT `menu_diskon_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_transaksi` ADD CONSTRAINT `detail_transaksi_transaksiId_fkey` FOREIGN KEY (`transaksiId`) REFERENCES `transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_transaksi` ADD CONSTRAINT `detail_transaksi_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
