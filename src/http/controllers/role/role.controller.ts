import { Request, Response } from 'express';

import { makeRoleUseCase } from '../../../use-cases/factories/make.role.js';

export class RoleController {
  async findAllRoles(req: Request, res: Response): Promise<Response> {
    const findAllRoles = makeRoleUseCase();
    const roles = await findAllRoles.findAllRoles();
    return res.status(200).send(roles);
  }
}
