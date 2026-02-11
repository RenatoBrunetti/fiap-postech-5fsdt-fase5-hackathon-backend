import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { IClass } from '../../entities/models/class.interface.js';
import { Class } from '../../entities/class.entity.js';
import { IClassRepository } from '../class.repository.interface.js';

export class ClassRepository implements IClassRepository {
  private repository: Repository<Class>;

  constructor() {
    this.repository = appDataSource.getRepository(Class);
  }

  async findById(id: string): Promise<IClass | null> {
    return this.repository.findOne({
      where: { id, active: true },
      relations: ['school', 'grade'],
      select: {
        school: { id: true, name: true },
        grade: { id: true, name: true },
      },
    });
  }

  async findAllBySchool(schoolId: string): Promise<IClass[]> {
    return this.repository.find({
      where: { schoolId, active: true },
      relations: ['school', 'grade'],
      select: {
        school: { id: true, name: true },
        grade: { id: true, name: true },
      },
    });
  }

  async findAllByGrade(gradeId: string): Promise<IClass[]> {
    return this.repository.find({
      where: { gradeId, active: true },
      relations: ['school', 'grade'],
      select: {
        school: { id: true, name: true },
        grade: { id: true, name: true },
      },
    });
  }

  async findByNameAndYear(
    name: string,
    year: number,
    schoolId: string,
  ): Promise<IClass | null> {
    return this.repository.findOne({
      where: { name, year, schoolId, active: true },
      relations: ['school', 'grade'],
      select: {
        school: { id: true, name: true },
        grade: { id: true, name: true },
      },
    });
  }

  async create(data: Partial<IClass>): Promise<IClass> {
    return this.repository.save(data);
  }
}
