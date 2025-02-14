import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import prisma from '../utils/prisma';


const transaksiService = new TransactionService()

export const createTransaksiController = async (req: Request, res: Response) => {
  try {
    const { stanId, details } = req.body; 

    const userId = res.locals.jwt.id

    const findStan = await prisma.stan.findFirst({
      where: {id: stanId}
    });

    if(!findStan){
      res.status(404).json({
        message: " stan not found"
      })
    }

    const findSiswa = await prisma.siswa.findFirst({
      where: {userId: userId}
    })

    if(!findSiswa){
      res.status(404).json({
        message: " siswa not found"
      })
    }

    const transaksi = await transaksiService.createTransaksi(stanId, findSiswa!.id ,details)
    
    res.status(201).json({
      message: 'Transaksi berhasil dibuat',
      transaksi,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create Transaksi',
      message: error,
    });
  }
};


export const removeTransaksi = async (req: Request, res: Response) => {
  try {

    const { id } = req.params 

    const transaksi = await transaksiService.deleteTransaksi(id);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaksi' });
  }
};

export const getTransaksiById = async (req: Request, res: Response) => {
  try {

    const { id } = req.params 

    const transaksi = await transaksiService.getTransaksiById(id);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksi' });
  }
};

export const getRekapBulanan = async (req: Request, res: Response) => {
  try {

    const { month, year } = req.body

    
    const userId = res.locals.jwt.id

    const findStan = await prisma.stan.findFirst({
      where: {userId: userId}
    });

    if(!findStan){
      res.status(404).json({
        message: " stan not found"
      })
    }

    const transaksi = await transaksiService.getPemasukanMonthly(findStan!.id, month, year);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksi' });
  }
};

export const getNota = async (req: Request, res: Response) => {
  try {

    const { id } = req.params 

    const findTransaksi = await prisma.transaksi.findFirst({
      where: {id: id}
    })

    if(!findTransaksi){
      res.status(404).json({ error: "transaksi not found" })
    }

    const transaksi = await transaksiService.getNota(findTransaksi!.id);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksi' });
  }
};


export const checkStatusTransaksi = async (req: Request, res: Response) => {
  try {

    const { id } = req.params 

    const transaksi = await transaksiService.getTransaksiById(id);
    res.status(201).json({
        status: transaksi?.status,
        transaksi
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksi' });
  }
};

export const updatePesanan = async (req: Request, res: Response) => {
  try {

    const { id } = req.params 

    const findTransaksi = await transaksiService.getTransaksiById(id)

    if(!findTransaksi){
        res.status(404).json({ error: "transaksi not found"})
    }

    const Data = {
        status: req.body.status,
      };

    const transaksi = await transaksiService.updatestatus(id, Data);
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaksi' });
  }
};

export const getdataTransactionByMonth = async (req: Request, res: Response) => {
    try {
  
    const { month , year} = req.body
    
    const userId = res.locals.jwt.id

    const findStan = await prisma.stan.findUnique({
        where: {userId : userId}
    })

    if(!findStan){
        res.status(404).json({ error: "stan not found"})
    }
  
      const transaksi = await transaksiService.getTransaksiByMonth(findStan!.id, month, year);
      res.status(201).json(transaksi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transaksi By month' });
    }
  };

export const getHistoryTransactionByMonth = async (req: Request, res: Response) => {
    try {
  
    const { month , year} = req.body
    
    const userId = res.locals.jwt.id

    const findSiswa = await prisma.siswa.findUnique({
        where: {userId : userId}
    })

    if(!findSiswa){
        res.status(404).json({ error: "siswa not found"})
    }
  
      const transaksi = await transaksiService.getHistoryTransaksiByMonth(findSiswa!.id, month, year);
      res.status(201).json(transaksi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transaksi By month' });
    }
  };

