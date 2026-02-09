import { Request, Response } from 'express';

import { makeUserUseCase } from '../../../use-cases/factories/make.user.js';
import { hashPassword } from '../../../lib/bcrypt/hash-password.js';

import { CreateUserBody } from './schemas/createUser.schema.js';

export class UserController {
  constructor() {}

  async findAllUsers(req: Request, res: Response): Promise<Response> {
    const userUseCase = makeUserUseCase();
    const users = await userUseCase.findAllUsers();
    return res.status(200).send(users);
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, document, roleId }: CreateUserBody =
      req.body;
    const hashedPassword = await hashPassword(password);
    const userUseCase = makeUserUseCase();
    const user = await userUseCase.createUser({
      name,
      email,
      password: hashedPassword,
      document,
      roleId,
    });
    return res.status(201).send(user);
  }
}
