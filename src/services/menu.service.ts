import prisma from "../utils/prisma";

export class MenuService {
  async createMenu(data: { stanId: string; nama_menu: string; harga: number; jenis: 'Makanan' | 'Minuman'; foto: string; deskripsi: string; }) {
    return await prisma.menu.create({
      data,
    });
  }

  async getMenu() {
    return await prisma.menu.findMany()
  }

  async getMenuById(id: string) {
    return await prisma.menu.findUnique({
      where: { id },
    });
  }

  async getMenuByStand(id: string) {
    return await prisma.menu.findMany({
      where: { stanId: id },
    });
  }

  async updateMenu(id: string, data: {nama_menu: string; harga: number; jenis: 'Makanan' | 'Minuman'; foto: string; deskripsi: string; }) {
    return await prisma.menu.update({
      where: { id },
      data,
    });
  }

  async deleteMenu(id: string) {
    return await prisma.menu.delete({
      where: { id },
    });
  }

  async createMenuDiskon(data: {menuId: string; diskonId: string}) {
    return await prisma.menu_diskon.create({
      data,
    });
  }

  async getAllMenuDiskon() {
    return await prisma.menu_diskon.findMany()
  }

  async getMenuDiskonById(id: string) {
    return await prisma.menu_diskon.findUnique({
      where: { id }
    });
  }

  async updateMenuDiskon(id: string , data: {menuId: string; diskonId: string}) {
    return await prisma.menu_diskon.update({
      where: { id },
      data,
    });
  }

  async deleteMenuDiskon(id: string) {
    return await prisma.menu_diskon.delete({
      where :{ id}
    });
  }



}