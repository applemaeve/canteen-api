import { Router } from 'express';
import { getAllMenus, createMenu, getMenuById, getAllMenusByStand , updateMenu, removeMenu, getAllMenuDiskon, createMenuDiskon, updateMenuDiskon, removeMenuDiskon, getMenuDiskonById } from '../controllers/menu.controller';
import  uploadFile  from '../middleware/multer.config';
import { authenticateToken } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { verifyAddMenu, verifyUpdateMenu } from '../middleware/menu.verify';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', authenticateToken, roleMiddleware(Role.admin, Role.superadmin) , uploadFile.uploadMenu.single('image'), verifyAddMenu ,createMenu);
router.get('/', authenticateToken, getAllMenus);
router.get('/:id',authenticateToken , getMenuById);
router.post('/stan/', authenticateToken, getAllMenusByStand)
router.put('/:id', authenticateToken, roleMiddleware(Role.admin, Role.superadmin)  ,uploadFile.uploadMenu.single('image') , verifyUpdateMenu ,updateMenu);
router.delete('/:id',authenticateToken,  roleMiddleware(Role.admin, Role.superadmin) ,removeMenu);

router.get('/menuDiskon', authenticateToken, getAllMenuDiskon );
router.get('/menuDiskon/:id', authenticateToken, roleMiddleware( Role.admin, Role.superadmin)  , getMenuDiskonById );
router.post('/menuDiskon', authenticateToken, roleMiddleware( Role.admin, Role.superadmin),  createMenuDiskon );
router.put('/menuDiskon/:id', authenticateToken,roleMiddleware( Role.admin, Role.superadmin)  ,updateMenuDiskon );
router.delete('/menuDiskon/:id', authenticateToken, roleMiddleware( Role.admin, Role.superadmin) ,removeMenuDiskon );

export default router;