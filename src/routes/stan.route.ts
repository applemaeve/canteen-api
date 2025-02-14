import { Router } from 'express';
import { getAllStans, createStan, getStanById, updateStan, removeStan } from '../controllers/stan.controller';
import {authenticateToken} from '../middleware/auth.middleware';
import { verifyAddStan, verifyUpdateStan } from '../middleware/stan.verify'
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/stan', verifyAddStan, createStan);
router.post('/', authenticateToken, verifyAddStan , roleMiddleware(Role.admin, Role.superadmin ), createStan);
router.get('/', authenticateToken , getAllStans);
router.get('/:id', authenticateToken, getStanById);
router.put('/:id',authenticateToken, verifyUpdateStan ,roleMiddleware( Role.admin, Role.superadmin) ,updateStan);
router.delete('/:id',authenticateToken, roleMiddleware( Role.admin, Role.superadmin) ,removeStan);

export default router;