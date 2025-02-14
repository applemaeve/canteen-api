import { Request } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Konfigurasi penyimpanan file
const Menustorage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, cb) => {

        // Path folder "public/menu-image" di luar folder "src"
        const uploadPath = path.join(__dirname, '../../public/menu-image/');
        
        // Cek dan buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (request: Request, file: Express.Multer.File, cb) => {
        // Buat nama file yang unik
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
});

const Userstorage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, cb) => {

        // Path folder "public/menu-image" di luar folder "src"
        const uploadPath = path.join(__dirname, '../../public/user-image/');
        
        // Cek dan buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (request: Request, file: Express.Multer.File, cb) => {
        // Buat nama file yang unik
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
});

// Filter untuk menerima hanya tipe file JPEG dan PNG
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed!'));
    }
};

const uploadMenu = multer({ 
    storage: Menustorage , 
    limits: {
        fileSize: 1024 * 1024 * 5 // Batas ukuran file 5MB
    }, 
    fileFilter 
});

const uploadUser = multer({ 
    storage: Userstorage , 
    limits: {
        fileSize: 1024 * 1024 * 5 // Batas ukuran file 5MB
    }, 
    fileFilter 
});

export default {uploadMenu, uploadUser};
