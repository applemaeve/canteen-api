// services/siswa.service.ts
import prisma from "../utils/prisma";

export class SiswaService {
  async createSiswa(data: { userId: string; nama_siswa: string; alamat: string; telp: string; foto: string }) {
    return await prisma.siswa.create({
      data,
    });
  }

  async getSiswa() {
    return await prisma.siswa.findMany()
  }

  async getSiswaById(id: string) {
    return await prisma.siswa.findFirst({
      where: { id },
    });
  }

  async updateSiswa(id: string, data: { nama_siswa?: string; alamat?: string; telp?: string; foto?: string }) {
    return await prisma.siswa.update({
      where: { id },
      data,
    });
  }

  async deleteSiswa(id: string) {
    return await prisma.siswa.delete({
      where: { id },
    });
  }

  
}