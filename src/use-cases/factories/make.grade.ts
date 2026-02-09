import { GradeRepository } from '../../repositories/typeorm/grade.repository.js';
import { GradeUseCase } from '../grade.usecase.js';

export function makeGradeUseCase() {
  const gradeRepository = new GradeRepository();
  const gradeUseCase = new GradeUseCase(gradeRepository);
  return gradeUseCase;
}
