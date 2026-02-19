import { Request, Response } from 'express';

import { makeSchoolUseCase } from '../../../use-cases/factories/make.school.js';

// Schemas
import { CreateSchoolType } from './schemas/createSchool.schema.js';

export class SchoolController {
  async create(req: Request, res: Response): Promise<Response> {
    const data: CreateSchoolType = req.body;

    const schoolUseCase = makeSchoolUseCase();
    const school = await schoolUseCase.create(data);

    return res.status(201).json(school);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const schoolUseCase = makeSchoolUseCase();
    const schools = await schoolUseCase.findAll();

    return res.status(200).json(schools);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const schoolUseCase = makeSchoolUseCase();
    const school = await schoolUseCase.findById(id);
    return res.status(200).json(school);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const schoolUseCase = makeSchoolUseCase();
    await schoolUseCase.delete(id);
    return res.status(204).send();
  }
}
