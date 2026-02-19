import { IClass } from '../entities/models/class.interface.js';

export interface IClassRepository {
  findById(id: string): Promise<IClass | null>;
  findAllByIds(ids: string[]): Promise<IClass[]>;
  findAllBySchool(schoolId: string): Promise<IClass[]>;
  findAllByGrade(gradeId: string): Promise<IClass[]>;
  findByNameAndYear(
    name: string,
    year: number,
    schoolId: string,
  ): Promise<IClass | null>;
  create(data: Partial<IClass>): Promise<IClass>;
}
