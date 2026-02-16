import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { IUser } from '../../entities/models/user.interface.js';
import { User } from '../../entities/user.entity.js';
import { IUserRepository } from '../user.repository.interface.js';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async findAll(): Promise<IUser[]> {
    return this.repository.find({
      where: { active: true },
      relations: ['role'],
      select: { role: { id: true, name: true } },
    });
  }

  async findByDocument(document: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { document, active: true },
      relations: ['role'],
      select: { role: { id: true, name: true } },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { id, active: true },
      relations: ['role'],
      select: { role: { id: true, name: true } },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { email, active: true },
      relations: ['role'],
      select: { role: { id: true, name: true } },
    });
  }

  async findByEmailLogin(email: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { email, active: true },
      relations: ['role'],
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        roleId: true,
      },
    });
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }

  async update(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { active: false });
  }
}
