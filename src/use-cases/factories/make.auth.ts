import { RefreshTokenRepository } from '../../repositories/typeorm/refreshToken.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';
import { AuthUseCase } from '../auth.usecase.js';

export function makeAuthUseCase() {
  const userRepository = new UserRepository();
  const refreshTokenRepository = new RefreshTokenRepository();
  const authUseCase = new AuthUseCase(userRepository, refreshTokenRepository);
  return authUseCase;
}
