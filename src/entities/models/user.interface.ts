import { IRole } from './role.interface.js';
import { IRefreshToken } from './refreshToken.interface.js';

export interface IUser {
  id?: string;
  email: string;
  password?: string; // Avoid returning password by default
  name: string;
  document: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  roleId: string;
  role?: IRole;
  refreshTokens?: IRefreshToken[];
}
