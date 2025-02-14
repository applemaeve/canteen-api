import prisma from '../utils/prisma';

export class DiskonService {
    async createDiskon (data: { stanId: string; nama_diskon: string; persentase: number; tanggal_awal: Date; tanggal_akhir: Date; }) {
      return await prisma.diskon.create({
        data,
      });
    }
  
    async getDiskonById (id: string) {
      return await prisma.diskon.findUnique({
        where: { id },
      });
    }
  
    async getAllDiskon() {
      return await prisma.diskon.findMany();
    }

    async getAllDiskonByStand(id: string) {
      return await prisma.diskon.findMany(
        {
          where: {stanId: id}
        }
      );
    }
  
    async updateDiskon (id: string, data: { nama_diskon?: string; persentase?: number; tanggal_awal?: Date; tanggal_akhir?: Date; }) {
      return await prisma.diskon.update({
        where: { id },
        data,
      });
    }
  
    async deleteDiskon (id: string) {
      return await prisma.diskon.delete({
        where: { id },
      });
    }
  
  }