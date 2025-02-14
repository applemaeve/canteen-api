import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, removeUser } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { verifyAddUser, verifyUpdateUser } from '../middleware/user.verify';
import { Role } from '@prisma/client';

const router = Router();

router.post('/',authenticateToken, [verifyAddUser] , roleMiddleware(Role.superadmin), createUser);
router.get('/',authenticateToken,  roleMiddleware(Role.superadmin) ,getAllUsers);
router.get('/:id',authenticateToken , roleMiddleware(Role.superadmin), getUserById);
router.put('/:id',authenticateToken, [verifyUpdateUser], updateUser);
router.delete('/:id',authenticateToken, roleMiddleware(Role.superadmin), removeUser);

export default router;