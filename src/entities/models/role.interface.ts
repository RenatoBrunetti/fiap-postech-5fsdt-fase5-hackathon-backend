import { IUser } from './user.interface.js';

export interface IRole {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  users?: IUser[];
}
