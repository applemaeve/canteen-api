import { Router } from 'express';
import { getAllDiskon, getDiskonById, getAllDiskonByStand, createDiskon, updateDiskon, removeDiskon } from '../controllers/diskon.controller';
import {authenticateToken} from '../middleware/auth.middleware';
import {roleMiddleware } from '../middleware/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', authenticateToken, roleMiddleware(Role.admin,Role.superadmin ) , createDiskon);
router.get('/', authenticateToken,  roleMiddleware( Role.admin,Role.superadmin, Role.customer) ,  getAllDiskon);
router.get('/stan', authenticateToken,  roleMiddleware( Role.admin,Role.customer, Role.superadmin) ,  getAllDiskonByStand);
router.get('/:id',authenticateToken, roleMiddleware( Role.admin,Role.superadmin)  , getDiskonById);
router.put('/:id', authenticateToken, roleMiddleware( Role.admin,Role.superadmin) , updateDiskon );
router.delete('/:id',authenticateToken, roleMiddleware(Role.admin,Role.superadmin) , removeDiskon);

export default router;