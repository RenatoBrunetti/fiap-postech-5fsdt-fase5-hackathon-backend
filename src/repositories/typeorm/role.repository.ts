import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { Role } from '../../entities/role.entity.js';
import { IRoleRepository } from '../role.repository.interface.js';
import { IRole } from '../../entities/models/role.interface.js';

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = appDataSource.getRepository(Role);
  }

  async findAll(): Promise<IRole[]> {
    return this.repository.find();
  }
}
