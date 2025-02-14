import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';


export const roleMiddleware = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.jwt.role; // Asumsikan `req.user` diisi oleh `authenticateToken`
    if (!userRole) {
      res.status(403).json({ message: "Access denied. Role not found." });
    } else{
      if (!roles.includes(userRole)) {
        res.status(403).json({ message: "Access denied. Insufficient role." });
     } else {
      
        next();
     }

    }

  
  };
};
