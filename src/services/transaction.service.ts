import { $Enums } from "@prisma/client";
import prisma from "../utils/prisma";


export class TransactionService {
  
    async getTransaksiById (id: string) {
      return await prisma.transaksi.findUnique({
        where: { id }, 
      });
    }

    async getPemasukanMonthly (stanId: string, month:number, year:number ) {

      const startDate = new Date(year, month - 1, 1); // Tanggal awal bulan
      const endDate = new Date(year, month, 1); 

      const pemasukan = await prisma.transaksi.aggregate({
        where: {
          stanId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        _sum: {
          Totalprice: true,
        },
      });
    
      // Respons dengan hasil bulan yang dipilih
      return {
        bulan: startDate.toLocaleString("id-ID", { month: "long", year: "numeric" }),
        pemasukan: pemasukan._sum.Totalprice || 0,
      };

    }



    async getNota (id: string) {
      const transaksi = await prisma.transaksi.findUnique({
        where: { id }, 
        include: {
          siswa: true,
          detail_transaksi: {
            include: {
              menu: true,
            },
          },
        }, 
      });

      return {
        transaksiId: transaksi!.id,
        tanggal: transaksi!.date,
        siswa: {
          id: transaksi!.siswa.id,
          nama: transaksi!.siswa.nama_siswa,
        },
        items: transaksi!.detail_transaksi.map((detail) => ({
          nama_menu: detail.menu.nama_menu,
          quantity: detail.quantity,
          harga_satuan: detail.price,
          harga_total: detail.quantity * detail.price,
        })),
        total_harga: transaksi!.Totalprice,
      };

    }

    async getTransaksiByMonth (id: string, month:number, year:number) {

      const startDate = new Date(year, month - 1, 1); // Tanggal awal bulan
      const endDate = new Date(year, month, 1); // Tanggal awal bulan berikutnya

      return await prisma.transaksi.findMany({
        where: {
          AND: [
            {stanId: id},
            {
            date: {
              gte: startDate, // Lebih besar atau sama dengan tanggal awal
              lt: endDate, // Kurang dari tanggal awal bulan berikutnya
            },
          }
          ]
        }
      });
    }

    async getHistoryTransaksiByMonth (id: string, month:number, year:number) {

      const startDate = new Date(year, month - 1, 1); // Tanggal awal bulan
      const endDate = new Date(year, month, 1); // Tanggal awal bulan berikutnya

      return await prisma.transaksi.findMany({
        where: {
          AND: [
            { siswaId: id},
            {
            date: {
              gte: startDate, // Lebih besar atau sama dengan tanggal awal
              lt: endDate, // Kurang dari tanggal awal bulan berikutnya
            },
          }
          ]
        }
      });
    }


    async updatestatus (id: string, data: {status: 'pesanan_diterima' | 'dimasak' | 'diantar' | 'sampai'}) {
      return await prisma.transaksi.update({
        where: { id },
        data,
      });
    }
  
    async getAllTransaktion() {
      return await prisma.transaksi.findMany();
    }
  
    async deleteTransaksi (id: string) {
      return await prisma.transaksi.delete({
        where: { id },
      });
    }

    async createTransaksi(
      stanId: string,
      siswaId: string,
      details: { menuId: string; quantity: number }[]
    ) {
      try {
        // Ambil semua menu terkait dengan `stanId`
        const menus = await prisma.menu.findMany({
          where: { stanId },
        });
    
        if (menus.length === 0) {
          throw new Error("No menus available for the given stan.");
        }
    
        // Ambil semua diskon aktif untuk menu di `stanId`
        const activeDiscounts = await prisma.menu_diskon.findMany({
          where: {
            menu: { stanId },
            diskon: {
              tanggal_awal: { lte: new Date() },
              tanggal_akhir: { gte: new Date() },
            },
          },
          include: {
            diskon: true,
          },
        });
    
        // Fungsi untuk menghitung harga setelah diskon
        const calculatePriceAfterDiscount = (menu: { id: string; stanId: string; nama_menu: string; harga: number; jenis: $Enums.Jenis; foto: string; deskripsi: string; createdAt: Date; }, activeDiscount: ({ diskon: { id: string; stanId: string; nama_diskon: string; persentase: number; tanggal_awal: Date; tanggal_akhir: Date; }; } & { id: string; diskonId: string; menuId: string; }) | undefined) => {
          const discountPercentage = activeDiscount ? activeDiscount.diskon.persentase : 0;
          return menu.harga * (1 - discountPercentage / 100);
        };
    
        // Hitung total harga
        const totalPrice = details.reduce((total, item) => {
          const menu = menus.find((m) => m.id === item.menuId);
    
          if (!menu) {
            throw new Error(
              `Menu with ID ${item.menuId} does not belong to the specified stan.`
            );
          }
    
          // Cari diskon aktif untuk menu
          const activeDiscount = activeDiscounts.find(
            (menuDiskon) => menuDiskon.menuId === item.menuId
          );
    
          // Hitung harga setelah diskon
          const priceAfterDiscount = calculatePriceAfterDiscount(menu, activeDiscount);
    
          // Tambahkan harga total
          return total + priceAfterDiscount * item.quantity;
        }, 0);
    
        // Buat transaksi
        const transaksi = await prisma.transaksi.create({
          data: {
            date: new Date(),
            stanId,
            siswaId : siswaId,
            Totalprice: totalPrice,
            status: "pesanan_diterima", // Atur status default
            detail_transaksi: {
              create: details.map((item) => {
                const menu = menus.find((m) => m.id === item.menuId);
                if (!menu) {
                  throw new Error(`Menu with ID ${item.menuId} not found.`);
                }
                const activeDiscount = activeDiscounts.find(
                  (menuDiskon) => menuDiskon.menuId === item.menuId
                );
    
                // Hitung harga setelah diskon
                const priceAfterDiscount = calculatePriceAfterDiscount(menu, activeDiscount);
    
                return {
                  menuId: item.menuId,
                  quantity: item.quantity,
                  price: priceAfterDiscount,
                };
              }),
            },
          },
        });
    
        return transaksi;
      } catch (error) {
        console.log(`Transaction creation failed: ${error}`);
      }
    }
    
  }