import { Router } from 'express';
import { createTransaksiController, updatePesanan, removeTransaksi, getTransaksiById, getHistoryTransactionByMonth, getdataTransactionByMonth, getNota, getRekapBulanan } from '../controllers/transaksi.controller';
import {authenticateToken} from '../middleware/auth.middleware';
import {roleMiddleware } from '../middleware/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', authenticateToken, roleMiddleware(Role.customer) , createTransaksiController);
router.post('/rekap', authenticateToken,  roleMiddleware(Role.superadmin,  Role.admin) ,  getRekapBulanan);
router.post('/month', authenticateToken,  roleMiddleware(Role.superadmin,  Role.admin) ,  getdataTransactionByMonth);
router.post('/history', authenticateToken,  roleMiddleware( Role.customer) ,  getHistoryTransactionByMonth);
router.get('/nota/:id', authenticateToken, roleMiddleware( Role.customer), getNota )
router.put('/:id',authenticateToken, roleMiddleware(Role.superadmin,  Role.admin)  , updatePesanan);
router.delete('/:id', authenticateToken, roleMiddleware(Role.superadmin,  Role.admin) , removeTransaksi );
router.get('/:id',authenticateToken, roleMiddleware(Role.superadmin, Role.admin, Role.customer) , getTransaksiById);

export default router;