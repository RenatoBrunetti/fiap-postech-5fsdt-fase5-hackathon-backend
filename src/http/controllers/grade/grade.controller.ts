import { Request, Response } from 'express';

import { makeGradeUseCase } from '../../../use-cases/factories/make.grade.js';

import { FindGradeById } from './schemas/findGradeById.schema.js';
import { FindGradeByName } from './schemas/findGradeByName.schema.js';
import { FindGradeByCategory } from './schemas/findGradeByCategory.schema.js';

export class GradeController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const gradeUseCase = makeGradeUseCase();
    const grades = await gradeUseCase.findAll();
    return res.status(200).send(grades);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as FindGradeById;

    const gradeUseCase = makeGradeUseCase();
    const grade = await gradeUseCase.findById(id);

    return res.status(200).send(grade);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.params as FindGradeByName;

    const gradeUseCase = makeGradeUseCase();
    const grade = await gradeUseCase.findByName(name);

    return res.status(200).send(grade);
  }

  async findByCategory(req: Request, res: Response): Promise<Response> {
    const { category } = req.params as FindGradeByCategory;

    const gradeUseCase = makeGradeUseCase();
    const grade = await gradeUseCase.findByCategory(category);

    return res.status(200).send(grade);
  }
}
