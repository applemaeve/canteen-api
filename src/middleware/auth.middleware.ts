// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({ message: 'JWT_SECRET not configured' });
        return;
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            res.status(403).json({
                message: 'Invalid token',
                error
            });
            return;
        }
        res.locals.jwt = decoded;
        next();
    });
}