import { Request, Response } from "express";
import { UserService } from '../services/user.service'

const userService = new UserService()

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUser();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } =  req.body
    const users = userService.getUserById(id);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const users = await userService.createUser(userData)
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {

    const { id } =  req.body
    const findUser =  await userService.getUserById(id);

    if (!findUser) {
      res.status(404).json({ error: 'User not found' });
      return
    }
    const userData = {
      email: req.body.email || findUser.email ,
      role: req.body.role || findUser.role,
    };
    const users = await userService.updateUser(id ,userData)
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } =  req.body
    const users = userService.deleteUser(id);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};