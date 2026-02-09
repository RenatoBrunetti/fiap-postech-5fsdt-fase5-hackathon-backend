import { IRole } from '../entities/models/role.interface.js';
import { IRoleRepository } from '../repositories/role.repository.interface.js';

export class RoleUseCase {
  constructor(private roleRepository: IRoleRepository) {}

  async findAllRoles(): Promise<IRole[]> {
    return this.roleRepository.findAll();
  }
}
