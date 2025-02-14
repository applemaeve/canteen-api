import { Request, Response } from "express";
import { DiskonService } from '../services/diskon.service'
import prisma from "../utils/prisma";

const diskonService = new DiskonService()

export const getAllDiskon = async (req: Request, res: Response) => {
  try {
    const diskons = await diskonService.getAllDiskon();
    res.status(201).json(diskons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diskons' });
  }
};

export const getAllDiskonByStand = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.jwt.id

    const findStan = await prisma.stan.findFirst({
      where: {userId : userId}
    }) 

    if(!findStan){
      res.status(404).json({ error: 'Stans not found' });
    }

    const diskons = await diskonService.getAllDiskonByStand(findStan!.id);
    res.status(201).json(diskons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diskons by stan id' });
  }
};

export const getDiskonById = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params
    const diskons = await diskonService.getDiskonById(id);
    res.status(201).json(diskons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diskons' });
  }
};

export const createDiskon = async (req: Request, res: Response) => {
  try {

    const userId = res.locals.jwt.id

    const findStan = await prisma.stan.findFirst({
      where: {userId : userId}
    }) 

    if(!findStan){
      res.status(404).json({ error: 'Stans not found' });
    }

    const diskonData = {
      stanId: req.body.stanId || findStan!.id,
      nama_diskon: req.body.nama_diskon ,
      persentase: parseFloat(req.body.persentase),
      tanggal_awal: req.body.tanggal_awal ,
      tanggal_akhir: req.body.tanggal_akhir ,
    };
    const users = await diskonService.createDiskon(diskonData)
    res.status(201).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create diskon' });
  }
};

export const updateDiskon = async (req: Request, res: Response) => {
  try {

    const { id } =  req.params
    const findDiskon =  await diskonService.getDiskonById(id);

    if (!findDiskon) {
      res.status(404).json({ error: 'diskon not found' });
      return
    }
 
    const diskonData = {
      nama_diskon: req.body.nama_diskon ,
      persentase: parseFloat(req.body.persentase) ,
      tanggal_awal: req.body.tanggal_awal ,
      tanggal_akhir: req.body.tanggal_akhir ,
    };
    const users = await diskonService.updateDiskon(id ,diskonData)
    res.status(201).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update diskon' });
  }
};

export const removeDiskon = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params
    const users = await diskonService.deleteDiskon(id);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete diskon' });
  }
};