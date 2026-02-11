import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { IGrade } from '../../entities/models/grade.interface.js';
import { Grade } from '../../entities/grade.entity.js';
import { IGradeRepository } from '../grade.repository.interface.js';

export class GradeRepository implements IGradeRepository {
  private repository: Repository<Grade>;

  constructor() {
    this.repository = appDataSource.getRepository(Grade);
  }

  async findAll(): Promise<IGrade[]> {
    return this.repository.find({
      where: { active: true },
    });
  }

  async findById(id: string): Promise<IGrade | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByName(name: string): Promise<IGrade[]> {
    return this.repository.find({
      where: { name },
    });
  }

  async findByCategory(category: string): Promise<IGrade[]> {
    return this.repository.find({
      where: { category },
    });
  }
}
