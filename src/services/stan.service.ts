// services/stan.service.ts

import prisma from "../utils/prisma";

export class StanService {
  async createStan(data: { userId: string; nama_stan: string; nama_pemilik: string; telp: string;  }) {
    return await prisma.stan.create({
      data,
    });
  }

  async getStan() {
    return await prisma.stan.findMany();
  }

  async getStanById(id: string) {
    return await prisma.stan.findFirst({
      where: { id },
    });
  }

  async updateStan(id: string, data: { nama_stan?: string; nama_pemilik?: string; telp?: string; }) {
    return await prisma.stan.update({
      where: { id },
      data,
    });
  }

  async deleteStan(id: string) {
    return await prisma.stan.delete({
      where: { id },
    });
  }
}