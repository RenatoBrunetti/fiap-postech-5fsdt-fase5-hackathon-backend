import { SchoolRepository } from '../../repositories/typeorm/school.repository.js';
import { SchoolUseCase } from '../school.usecase.js';

export function makeSchoolUseCase() {
  const schoolRepository = new SchoolRepository();
  const schoolUseCase = new SchoolUseCase(schoolRepository);
  return schoolUseCase;
}
