import { ClassRepository } from '../../repositories/typeorm/class.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';
import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';

import { ClassUserUseCase } from '../classUser.usecase.js';

export function makeClassUserUseCase() {
  const classUserRepository = new ClassUserRepository();
  const classRepository = new ClassRepository();
  const userRepository = new UserRepository();

  return new ClassUserUseCase(
    classUserRepository,
    userRepository,
    classRepository,
  );
}
