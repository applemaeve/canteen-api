// services/user.service.ts
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  async createUser (data: { email: string; password: string; role: 'admin' | 'customer' }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
  }

  async getUserById (id: string) {
    return await prisma.users.findUnique({
      where: { id },
    });
  }

  async findEmail (email: string) {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  async getAllUser() {
    return await prisma.users.findMany();
  }

  async updateUser (id: string, data: { email?: string; password?: string; role?: 'admin' | 'customer' }) {
    return await prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser (id: string) {
    return await prisma.users.delete({
      where: { id },
    });
  }



  async generateToken(userId: string, roleUser: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables'); 
    }
    const token = jwt.sign({ id: userId, role:roleUser }, secret, { expiresIn: '1h' });
    return token;
  }

}