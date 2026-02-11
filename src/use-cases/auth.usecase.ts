import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

import env from '../env.js';
import { IUser } from '../entities/models/user.interface.js';
import { comparePassword } from '../lib/bcrypt/hash-password.js';
import { IRefreshTokenRepository } from '../repositories/refreshToken.repository.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthUseCase {
  private secret: string = env.JWT_SECRET;
  private refreshSecret: string = env.JWT_REFRESH_SECRET;
  private accessTokenExpiresIn = env.JWT_EXPIRES_IN as StringValue | number;
  private refreshTokenExpiresIn = env.JWT_REFRESH_EXPIRES_IN as
    | StringValue
    | number;

  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<IAuthTokens | null> {
    const user = await this.userRepository.findByEmailLogin(email);
    if (!user) return null;

    if (password && user.password) {
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) return null;
      return this.generateTokens(user);
    }

    return null;
  }

  async generateTokens(user: IUser): Promise<IAuthTokens> {
    if (!user.id) throw new Error('User ID is required for token generation');
    if (!user.role)
      throw new Error('User role is required for token generation');

    const payload = { sub: user.id, role: user?.role?.name };

    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpiresIn,
    });

    const refreshTokenValue = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshTokenExpiresIn,
    });

    // Refresh token persistence (default 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    if (!user.id) throw new Error('User ID is required for token generation');
    await this.refreshTokenRepository.create({
      token: refreshTokenValue,
      userId: user.id,
      expiresAt,
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }

  async refreshToken(token: string): Promise<IAuthTokens> {
    // 1. Check token validity and JWT expiration
    const decoded = jwt.verify(token, this.refreshSecret) as { sub: string };

    // 2. Check if the token exists in the database (revocation/whitelist)
    const storedToken = await this.refreshTokenRepository.findByToken(token);
    if (!storedToken) throw new Error('Refresh token invalid');

    // 3. Token Rotation: Delete the old one to prevent reuse
    await this.refreshTokenRepository.delete(storedToken.id);

    // 4. Fetch user and generate new pair of tokens
    const user = await this.userRepository.findById(decoded.sub);
    if (!user) throw new Error('User not found');

    return this.generateTokens(user);
  }

  async logout(token: string): Promise<void> {
    // 1. Check if the token exists in the database (revocation/whitelist)
    const storedToken = await this.refreshTokenRepository.findByToken(token);
    if (!storedToken) throw new Error('Refresh token invalid');

    // 2. Token Rotation: Delete the old one to prevent reuse
    await this.refreshTokenRepository.delete(storedToken.id);
  }
}
