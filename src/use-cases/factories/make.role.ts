import { RoleRepository } from '../../repositories/typeorm/role.repository.js';
import { RoleUseCase } from '../role.usecase.js';

export function makeRoleUseCase() {
  const roleRepository = new RoleRepository();
  const roleUseCase = new RoleUseCase(roleRepository);
  return roleUseCase;
}
