import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';
import { IRefreshToken } from '../../entities/models/refreshToken.interface.js';
import { RefreshToken } from '../../entities/refreshToken.entity.js';
import { IRefreshTokenRepository } from '../refreshToken.repository.interface.js';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = appDataSource.getRepository(RefreshToken);
  }

  async findByToken(token: string): Promise<IRefreshToken | null> {
    return this.repository.findOne({ where: { token } });
  }

  async create(user: IRefreshToken): Promise<IRefreshToken> {
    return this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
