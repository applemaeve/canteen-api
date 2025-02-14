import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../utils/prisma";
import { MenuService } from '../services/menu.service'

const menuService = new MenuService()

export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const menu = await menuService.getMenu();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

export const getAllMenusByStand = async (req: Request, res: Response) => {
  try {
 
    const { nama_stan } = req.body;

    console.log(nama_stan);

    const findStand = await prisma.stan.findFirst({
      where: {
        nama_stan: nama_stan, 
      },
    });

    if (!findStand) {
       res.status(404).json({ error: 'Stand not found' });
       return
    }

    console.log(findStand.id);

    const menu = await menuService.getMenuByStand(findStand.id);
    
    res.status(200).json(menu);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ error: 'Failed to fetch menu by nama stan' });
  }
};



export const getMenuById = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params
    console
    const menu = await menuService.getMenuById(id);

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

export const createMenu = async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
   }

   const userId = res.locals.jwt.id

   const findStand = await prisma.stan.findFirst({
    where: {userId : userId }
   })

    const menuData = {
      stanId: req.body.stanId || findStand!.id,
      nama_menu: req.body.nama_menu,
      harga: parseFloat(req.body.harga),
      jenis: req.body.jenis,
      deskripsi: req.body.deskripsi,
      foto: req.file!.filename ,
    };

    const menu = await menuService.createMenu(menuData)
    res.status(201).json(menu);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create menu' });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {

    const { id } =  req.params;
    const findMenu =  await menuService.getMenuById(id);

    if (!findMenu) {
      res.status(404).json({ error: 'Menu not found' });
      return
    }
    let updatedImage = findMenu.foto;
    
    if (req.file) {
      // delete old menu image in folder
      if (findMenu.foto) {
        const oldImagePath = path.join(__dirname, '../../public/menu-image/', findMenu.foto);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updatedImage = req.file.filename;
    }

    const menuData = {
        nama_menu: req.body.nama_menu || findMenu.nama_menu,
        harga: parseFloat(req.body.harga) || findMenu.harga, 
        jenis: req.body.jenis || findMenu.jenis,
        deskripsi: req.body.deskripsi || findMenu.deskripsi,
        foto: updatedImage,
    };
    const menu = await menuService.updateMenu(id ,menuData)
    res.status(201).json(menu);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update menu' });
  }
};

export const removeMenu = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params

      const findMenu =  await menuService.getMenuById(id);

    if (!findMenu) {
      res.status(404).json({ error: 'menu not found' });
      return
    }

      if (findMenu!.foto) {
          const oldImagePath = path.join(__dirname, '../../public/menu-image/', findMenu.foto);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
    const menu = menuService.deleteMenu(id);
    res.status(201).json(true);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu' });
  }
};


///MENU DISKON
//eror
export const getAllMenuDiskon = async (req: Request, res: Response) => {
  try {

    const menuDiskon = await menuService.getAllMenuDiskon();
    console.log(menuDiskon);
    res.status(200).json(menuDiskon);
  } catch (error) {
    console.error('Error fetching discounted menus:', error);
    res.status(500).json({ error: 'Failed to fetch MenuDiskon' });
  }
};

export const getMenuDiskonById = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const menuDiskon = await menuService.getMenuDiskonById(id);
    res.status(201).json(menuDiskon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch MenuDiskon' });
  }
};

export const getMenuDiskonByStand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const menuDiskon = await menuService.getMenuDiskonById(id);
    res.status(201).json(menuDiskon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch MenuDiskon' });
  }
};

export const removeMenuDiskon = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const menuDiskon = await menuService.deleteMenuDiskon(id);
    res.status(201).json(true);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete MenuDiskon' });
  }
};



export const updateMenuDiskon = async (req: Request, res: Response) => {
  try {

    const { id } =  req.params;
    const findMenuDiskon =  await menuService.getMenuDiskonById(id);

    if (!findMenuDiskon) {
      res.status(404).json({ error: 'Menu Diskon not found' });
      return
    }

    const { nama_menu , nama_diskon  } = req.body

    const userId = res.locals.jwt.id

    const findStand = await prisma.stan.findFirst({
      where: {userId : userId}
     })

     if (!findStand) {
      res.status(404).json({ error: 'stan not found' });
      return
    }

    const findDiskon = await prisma.diskon.findFirst({
      where: {nama_diskon : nama_diskon}
     })

     if (!findDiskon) {
      res.status(404).json({ error: 'diskon not found' });
      return
    }

    const findMenu = await prisma.menu.findFirst({
      where: {nama_menu : nama_menu}
     })

     if (!findMenu) {
      res.status(404).json({ error: 'menu not found' });
      return
    }

     if (findDiskon.stanId !== findStand?.id) {
      res.status(400).json({ error: 'You are not authorized to add this diskon' });
   }

     if (findMenu.stanId !== findStand?.id) {
      res.status(400).json({ error: 'You are not authorized to add this menu' });
   }

     const menuDiskonData = {
      menuId: findMenu.id,
      diskonId: findDiskon.id,
  };

    const menuDiskon = await menuService.updateMenuDiskon(id ,menuDiskonData);
    res.status(201).json(menuDiskon)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update MenuDiskon' });
  }
};




export const createMenuDiskon = async (req: Request, res: Response) => {
  try {

    const { nama_menu , nama_diskon  } = req.body

    const userId = res.locals.jwt.id

    const findStand = await prisma.stan.findFirst({
      where: {userId : userId}
     })

     if (!findStand) {
      res.status(404).json({ error: 'stan not found' });
      return
    }

    const findDiskon = await prisma.diskon.findFirst({
      where: {nama_diskon : nama_diskon}
     })

     if (!findDiskon) {
      res.status(404).json({ error: 'diskon not found' });
      return
    }

    const findMenu = await prisma.menu.findFirst({
      where: {nama_menu : nama_menu}
     })

     if (!findMenu) {
      res.status(404).json({ error: 'menu not found' });
      return
    }

     if (findDiskon.stanId !== findStand?.id) {
      res.status(400).json({ error: 'You are not authorized to add this diskon' });
   }

     if (findMenu.stanId !== findStand?.id) {
      res.status(400).json({ error: 'You are not authorized to add this menu' });
   }

     const menuDiskonData = {
      menuId: findMenu.id,
      diskonId: findDiskon.id,
  };

    const menuDiskon = await menuService.createMenuDiskon(menuDiskonData);
    res.status(201).json(menuDiskon)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add MenuDiskon' });
  }
};