import { Request, Response } from 'express';

import { makeRoleUseCase } from '../../../use-cases/factories/make.role.js';

export class RoleController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const roleUseCase = makeRoleUseCase();
    const roles = await roleUseCase.findAll();
    return res.status(200).json(roles);
  }
}
