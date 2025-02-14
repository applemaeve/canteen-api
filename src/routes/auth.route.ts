import { Router } from 'express';
import { registerUser , loginUser  } from '../controllers/auth.controller';
import  {verifyRegistation, verifyLogin } from '../middleware/user.verify'

const router = Router();

// Endpoint untuk pengguna
router.post('/register', verifyRegistation, registerUser ); // Mendaftar pengguna
router.post('/login', verifyLogin, loginUser ); // Login pengguna

export default router;