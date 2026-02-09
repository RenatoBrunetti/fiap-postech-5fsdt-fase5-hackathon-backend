import { UserRepository } from '../../repositories/typeorm/user.repository.js';
import { UserUseCase } from '../user.usecase.js';

export function makeUserUseCase() {
  const userRepository = new UserRepository();
  const userUseCase = new UserUseCase(userRepository);
  return userUseCase;
}
