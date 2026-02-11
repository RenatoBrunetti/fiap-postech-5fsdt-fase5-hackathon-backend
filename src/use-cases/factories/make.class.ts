import { ClassRepository } from '../../repositories/typeorm/class.repository.js';
import { SchoolRepository } from '../../repositories/typeorm/school.repository.js';
import { GradeRepository } from '../../repositories/typeorm/grade.repository.js';
import { ClassUseCase } from '../class.usecase.js';

export function makeClassUseCase() {
  const classRepository = new ClassRepository();
  const schoolRepository = new SchoolRepository();
  const gradeRepository = new GradeRepository();

  return new ClassUseCase(classRepository, schoolRepository, gradeRepository);
}
