import { Request, Response } from 'express';

import { makeClassUseCase } from '../../../use-cases/factories/make.class.js';

import { CreateClassType } from './schemas/createClass.schema.js';
import { FindClassBySchoolType } from './schemas/findClassBySchool.schema.js';
import { FindClassByGradeType } from './schemas/findClassByGrade.schema.js';

export class ClassController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as CreateClassType;
    const classUseCase = makeClassUseCase();
    const newClass = await classUseCase.create(data);
    return res.status(201).json(newClass);
  }

  async findBySchool(req: Request, res: Response): Promise<Response> {
    const { schoolId } = req.params as FindClassBySchoolType;
    const classUseCase = makeClassUseCase();
    const classes = await classUseCase.findAllBySchool(schoolId);
    return res.status(200).json(classes);
  }

  async findByGrade(req: Request, res: Response): Promise<Response> {
    const { gradeId } = req.params as FindClassByGradeType;
    const classUseCase = makeClassUseCase();
    const classes = await classUseCase.findAllByGrade(gradeId);
    return res.status(200).json(classes);
  }

  async findByUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params as { userId: string };
    const classUseCase = makeClassUseCase();
    const classes = await classUseCase.findAllByUser(userId);
    return res.status(200).json(classes);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const classUseCase = makeClassUseCase();
    const classData = await classUseCase.findById(id);
    return res.status(200).json(classData);
  }
}
