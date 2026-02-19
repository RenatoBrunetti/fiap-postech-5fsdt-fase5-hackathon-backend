import { ClassRepository } from '../../repositories/typeorm/class.repository.js';
import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';
import { SchoolRepository } from '../../repositories/typeorm/school.repository.js';
import { GradeRepository } from '../../repositories/typeorm/grade.repository.js';
import { ClassUseCase } from '../class.usecase.js';

export function makeClassUseCase() {
  const classRepository = new ClassRepository();
  const classUserRepository = new ClassUserRepository();
  const schoolRepository = new SchoolRepository();
  const gradeRepository = new GradeRepository();

  return new ClassUseCase(
    classRepository,
    classUserRepository,
    schoolRepository,
    gradeRepository,
  );
}
