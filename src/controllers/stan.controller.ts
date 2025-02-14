import { Request, Response } from "express";
import { StanService } from '../services/stan.service'

const stanService = new StanService()

export const getAllStans = async (req: Request, res: Response) => {
  try {
    const stan = await stanService.getStan();
    res.status(201).json(stan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stans' });
  }
};

export const getStanById = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params
    console.log(id)
    const stan = await stanService.getStanById(id);
    if (!stan) {
      res.status(404).json({ error: "Stan not found" });
    }
    console.log(stan)
    res.status(201).json(stan);
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch stan' });
  }
};

export const createStan = async (req: Request, res: Response) => {
  try {

    const userId = res.locals.jwt.id;

    const userData = {
      userId:  req.body.userId || userId,
      nama_stan: req.body.nama_stan,
      nama_pemilik: req.body.nama_pemilik,
      telp: req.body.telp,
    };

    console.log(userData)
    const stan = await stanService.createStan(userData)
    res.status(201).json(stan);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create stan' });
  }
};

export const updateStan = async (req: Request, res: Response) => {
  try {

    const { id } =  req.params
    const findStan =  await stanService.getStanById(id);

    if (!findStan) {
      res.status(404).json({ error: 'stan/user not found' });
      return
    }

    const userId = res.locals.jwt.id;

    if (findStan.userId !== userId) {
       res.status(403).json({ error: 'You are not authorized to update this stan' });
    }

    const userData = {
        nama_stan: req.body.nama_stan || findStan.nama_stan,
        nama_pemilik: req.body.nama_pemilik || findStan.nama_pemilik, 
        telp: req.body.telp || findStan.telp,
    };
    const users = await stanService.updateStan(id ,userData)
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stan' });
  }
};

export const removeStan = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params

    const findUser =  await stanService.getStanById(id);

    if (!findUser) {
      res.status(404).json({ error: 'stan/user not found' });
      return
    }


    const userId = res.locals.jwt.id
        // const userRole = res.locals.jwt.role
    
          const users = await stanService.deleteStan(id);
          res.status(201).json(true);
      
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete stans' });
  }
};