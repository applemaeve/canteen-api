import { Router } from 'express';
import { getAllStudents, createStudent, getStudentById, updateStudent, removeStudent } from '../controllers/student.controller';
import {authenticateToken} from '../middleware/auth.middleware';
import  uploadFile  from '../middleware/multer.config';
import { roleMiddleware } from '../middleware/role.middleware';
import { verifyAddStudent, verifyUpdateStudent } from '../middleware/student.verify';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', authenticateToken, uploadFile.uploadUser.single("foto"), verifyAddStudent, roleMiddleware(Role.admin, Role.customer, Role.superadmin) ,createStudent);
router.get('/', authenticateToken, roleMiddleware(Role.admin, Role.superadmin),getAllStudents);
router.get('/:id',authenticateToken, roleMiddleware(Role.admin,  Role.superadmin) ,getStudentById);
router.put('/:id', authenticateToken, uploadFile.uploadUser.single("foto"), verifyUpdateStudent ,roleMiddleware(Role.admin, Role.customer, Role.superadmin) ,updateStudent);
router.delete('/:id',authenticateToken, roleMiddleware(Role.admin,  Role.superadmin) , removeStudent);

export default router;