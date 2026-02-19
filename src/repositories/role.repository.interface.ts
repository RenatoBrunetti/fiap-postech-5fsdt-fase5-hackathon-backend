import { IRole } from '../entities/models/role.interface.js';

export interface IRoleRepository {
  findAll(): Promise<IRole[]>;
  findByName(name: string): Promise<IRole | null>;
}
