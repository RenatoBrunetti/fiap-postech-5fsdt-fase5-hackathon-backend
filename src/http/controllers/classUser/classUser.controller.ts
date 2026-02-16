import { Request, Response } from 'express';

import { makeClassUserUseCase } from '../../../use-cases/factories/make.classUser.js';

import { FindByUserType } from './schemas/findByUser.schema.js';

export class ClassUserController {
  async assign(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const classUserUseCase = makeClassUserUseCase();
    const assignment = await classUserUseCase.assign(data);
    return res.status(201).json(assignment);
  }

  async findByUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params as FindByUserType;
    const classUserUseCase = makeClassUserUseCase();
    const classes = await classUserUseCase.findByUser(userId);
    return res.json(classes);
  }
}
