import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';

import { IClassUser } from '../../entities/models/classUser.interface.js';
import { ClassUser } from '../../entities/classUser.entity.js';

import { IClassUserRepository } from '../classUser.repository.interface.js';

export class ClassUserRepository implements IClassUserRepository {
  private repository: Repository<ClassUser>;

  constructor() {
    this.repository = appDataSource.getRepository(ClassUser);
  }

  async findAllByUserId(userId: string): Promise<IClassUser[]> {
    return this.repository.find({
      where: { userId },
      relations: ['class', 'class.school', 'user', 'user.role'],
      select: {
        class: { id: true, name: true, school: { id: true, name: true } },
      },
    });
  }

  async findByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<IClassUser | null> {
    return this.repository.findOne({
      where: { userId, classId },
      relations: ['user', 'class', 'user.role', 'class.school'],
      select: {
        user: { id: true, name: true, role: { id: true, name: true } },
        class: { id: true, name: true, school: { id: true, name: true } },
      },
    });
  }

  async findByIdWithDetails(id: string): Promise<IClassUser | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'class', 'user.role', 'class.school'],
      select: {
        user: { id: true, name: true, role: { id: true, name: true } },
        class: { id: true, name: true, school: { id: true, name: true } },
      },
    });
  }

  async create(data: Partial<IClassUser>): Promise<IClassUser> {
    return this.repository.save(data);
  }
}
