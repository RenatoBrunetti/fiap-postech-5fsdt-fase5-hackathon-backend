import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { ISchool } from '../../entities/models/school.interface.js';
import { School } from '../../entities/school.entity.js';
import { ISchoolRepository } from '../school.repository.interface.js';

export class SchoolRepository implements ISchoolRepository {
  private repository: Repository<School>;

  constructor() {
    this.repository = appDataSource.getRepository(School);
  }

  async findAll(): Promise<ISchool[]> {
    return this.repository.find({
      where: { active: true },
    });
  }

  async findByDocument(document: string): Promise<ISchool | null> {
    return this.repository.findOne({
      where: { document },
    });
  }

  async create(data: Partial<ISchool>): Promise<ISchool> {
    return this.repository.save(data);
  }
}
