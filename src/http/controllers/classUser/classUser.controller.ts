import { Request, Response } from 'express';

import { makeClassUserUseCase } from '../../../use-cases/factories/make.classUser.js';

export class ClassUserController {
  async assign(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const classUserUseCase = makeClassUserUseCase();
    const assignment = await classUserUseCase.assign(data);
    return res.status(201).send(assignment);
  }
}
