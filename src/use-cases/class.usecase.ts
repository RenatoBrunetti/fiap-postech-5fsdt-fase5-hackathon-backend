import { IClass } from '../entities/models/class.interface.js';

import { IClassRepository } from '../repositories/class.repository.interface.js';
import { IClassUserRepository } from '../repositories/classUser.repository.interface.js';
import { ISchoolRepository } from '../repositories/school.repository.interface.js';
import { IGradeRepository } from '../repositories/grade.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

export class ClassUseCase {
  constructor(
    private classRepository: IClassRepository,
    private classUserRepository: IClassUserRepository,
    private schoolRepository: ISchoolRepository,
    private gradeRepository: IGradeRepository,
  ) {}

  async create(data: Partial<IClass>): Promise<IClass> {
    // 1. School Validation: Ensure the provided schoolId exists and is active
    if (!data.schoolId) throw new ApiError('School ID is required', 400);
    const school = await this.schoolRepository.findById(data.schoolId);
    if (!school) throw new ApiError('School not found', 404);

    // 2. Grade Validation: Ensure the provided gradeId exists and is active
    if (!data.gradeId) throw new ApiError('Grade ID is required', 400);
    const grade = await this.gradeRepository.findById(data.gradeId);
    if (!grade) throw new ApiError('Grade not found', 404);

    // 3. Optional: Validate if a class with the same name already exists for the same year in that school
    // This prevents accidental duplication
    if (!data.name || !data.year)
      throw new ApiError('Class name and year are required', 400);
    const classExists = await this.classRepository.findByNameAndYear(
      data.name,
      data.year,
      data.schoolId,
    );
    if (classExists)
      throw new ApiError(
        'Class name already exists for this school and year',
        409,
      );

    return await this.classRepository.create(data);
  }

  async findAllBySchool(schoolId: string): Promise<IClass[]> {
    return await this.classRepository.findAllBySchool(schoolId);
  }

  async findAllByGrade(gradeId: string): Promise<IClass[]> {
    return await this.classRepository.findAllByGrade(gradeId);
  }

  async findAllByUser(userId: string): Promise<IClass[]> {
    const classUsers = await this.classUserRepository.findAllByUserId(userId);
    if (!classUsers.length) return [];
    const classIds = classUsers.map((cu) => cu.classId);
    return this.classRepository.findAllByIds(classIds);
  }

  async findById(id: string): Promise<IClass> {
    const classData = await this.classRepository.findById(id);
    if (!classData) throw new ApiError('Class not found', 404);
    return classData;
  }
}
