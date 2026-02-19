import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';
import { RoleRepository } from '../../repositories/typeorm/role.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';
import { UserUseCase } from '../user.usecase.js';

export function makeUserUseCase() {
  const userRepository = new UserRepository();
  const roleRepository = new RoleRepository();
  const classUserRepository = new ClassUserRepository();
  const userUseCase = new UserUseCase(
    userRepository,
    roleRepository,
    classUserRepository,
  );
  return userUseCase;
}
