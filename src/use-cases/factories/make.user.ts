import { ClassRepository } from '../../repositories/typeorm/class.repository.js';
import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';
import { RoleRepository } from '../../repositories/typeorm/role.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';
import { UserUseCase } from '../user.usecase.js';

export function makeUserUseCase() {
  const userRepository = new UserRepository();
  const roleRepository = new RoleRepository();
  const classRepository = new ClassRepository();
  const classUserRepository = new ClassUserRepository();
  const userUseCase = new UserUseCase(
    userRepository,
    roleRepository,
    classRepository,
    classUserRepository,
  );
  return userUseCase;
}
