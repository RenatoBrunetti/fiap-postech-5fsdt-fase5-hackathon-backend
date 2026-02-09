import { Request, Response } from 'express';

import { makeSchoolUseCase } from '../../../use-cases/factories/make.school.js';

import { CreateSchoolType } from './schemas/createSchool.schema.js';

export class SchoolController {
  async create(req: Request, res: Response): Promise<Response> {
    const data: CreateSchoolType = req.body;

    const schoolUseCase = makeSchoolUseCase();
    const school = await schoolUseCase.create(data);

    return res.status(201).send(school);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const schoolUseCase = makeSchoolUseCase();
    const schools = await schoolUseCase.findAll();

    return res.status(200).send(schools);
  }
}
