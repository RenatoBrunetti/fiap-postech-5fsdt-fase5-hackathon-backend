import { EntityManager, In, Like, Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { ClassUser } from '../../entities/classUser.entity.js';
import { IUser } from '../../entities/models/user.interface.js';
import { User } from '../../entities/user.entity.js';
import { IUserRepository } from '../user.repository.interface.js';
import { IClassUser } from '../../entities/models/classUser.interface.js';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  private classUserRepository: Repository<ClassUser>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
    this.classUserRepository = appDataSource.getRepository(ClassUser);
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

  async findAllByIds(ids: string[]): Promise<IUser[]> {
    return this.repository.find({
      where: { id: In(ids), active: true },
      relations: ['role'],
      select: { role: { id: true, name: true } },
      order: { name: 'ASC' },
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

  async searchUsers(params: {
    roleId: string;
    searchQuery: string;
  }): Promise<IUser[] & { classUsers?: IClassUser[] }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { active: true, roleId: params.roleId };
    if (params.searchQuery && params.searchQuery.trim() !== '') {
      where['name'] = Like(`%${params.searchQuery}%`);
    }
    return this.repository.find({
      where,
      relations: ['classUsers'],
      order: { name: 'ASC' },
    });
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }

  async createAndAssign(user: IUser, classId: string): Promise<IUser> {
    return await appDataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const createdUser = await transactionalEntityManager
          .getRepository(User)
          .save(user);
        if (!createdUser) throw new Error('Failed to create user');
        const assignment = await transactionalEntityManager
          .getRepository(ClassUser)
          .save({
            userId: createdUser.id!,
            classId,
            startDate: new Date(),
          });
        if (!assignment) throw new Error('Failed to assign user to class');
        return createdUser;
      },
    );
  }

  async update(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { active: false });
  }
}
