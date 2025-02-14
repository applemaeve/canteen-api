import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { SiswaService } from '../services/siswa.service'


const siswaService = new SiswaService()

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const student = await siswaService.getSiswa();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    console.log(id)
    const student = await siswaService.getSiswaById(id);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
    }
    console.log(student)
    res.status(201).json(student);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
   }

   const userId = res.locals.jwt.id

    const userData = {
      userId: req.body.userId || userId,
      nama_siswa: req.body.nama_siswa,
      alamat: req.body.alamat,
      telp: req.body.telp,
      foto: req.file!.filename,
    };

    console.log(userData)

    const student = await siswaService.createSiswa(userData)
    res.status(201).json(student);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {

    const { id } =  req.params;
    const findUser =  await siswaService.getSiswaById(id);

    if (!findUser) {
      res.status(404).json({ error: 'User not found' });
      return
    }

    const userId = res.locals.jwt.id

    if (findUser.userId !== userId) {
       res.status(403).json({ error: 'You are not authorized to update this student' });
    }

    let updatedImage = findUser.foto;
    if (req.file) {
      // delete old menu image in folder
      if (findUser.foto) {
        const oldImagePath = path.join(__dirname, '../../public/user-image/', findUser.foto);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updatedImage = req.file.filename;
    }

    const userData = {
        nama_siswa: req.body.nama_siswa || findUser.nama_siswa,
        alamat: req.body.alamat || findUser.alamat, 
        telp: req.body.telp || findUser.telp,
        foto: updatedImage,
    };
    const users = await siswaService.updateSiswa(id ,userData)
    res.status(201).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const removeStudent = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params

    const findUser =  await siswaService.getSiswaById(id);

    const userId = res.locals.jwt.id
    // const userRole = res.locals.jwt.role

    if (findUser!.foto) {
      const oldImagePath = path.join(__dirname, '../../public/user-image/', findUser!.foto);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const users = await siswaService.deleteSiswa(id);
    res.status(201).json(true);
  
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete users' });
  }
};