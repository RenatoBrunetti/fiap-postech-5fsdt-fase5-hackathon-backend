import { Request, Response } from 'express';

import { makeUserUseCase } from '../../../use-cases/factories/make.user.js';

import { CreateUserBody } from './schemas/createUser.schema.js';

export class UserController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const userUseCase = makeUserUseCase();
    const users = await userUseCase.findAll();
    return res.status(200).json(users);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, document, roleId }: CreateUserBody =
      req.body;
    const userUseCase = makeUserUseCase();
    const user = await userUseCase.create({
      name,
      email,
      password,
      document,
      roleId,
    });
    return res.status(201).json(user);
  }

  async findMe(req: Request, res: Response): Promise<Response> {
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    const userUseCase = makeUserUseCase();
    const user = await userUseCase.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  }
}
