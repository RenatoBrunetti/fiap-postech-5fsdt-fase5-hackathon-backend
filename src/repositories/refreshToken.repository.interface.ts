import { IRefreshToken } from '../entities/models/refreshToken.interface.js';

interface IRefreshTokenCreateParams {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepository {
  findByToken(token: string): Promise<IRefreshToken | null>;
  create({
    token,
    userId,
    expiresAt,
  }: IRefreshTokenCreateParams): Promise<IRefreshToken>;
  delete(id: string): Promise<void>;
}
