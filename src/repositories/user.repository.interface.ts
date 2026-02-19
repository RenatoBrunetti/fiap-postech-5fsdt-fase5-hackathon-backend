import { IClassUser } from '../entities/models/classUser.interface.js';
import { IUser } from '../entities/models/user.interface.js';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findByDocument(document: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findAllByIds(ids: string[]): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findByEmailLogin(email: string): Promise<IUser | null>;
  searchUsers(params: {
    roleId: string;
    searchQuery: string;
  }): Promise<IUser[] & { classUsers?: IClassUser[] }>;
  create(user: IUser): Promise<IUser>;
  createAndAssign(user: IUser, classId: string): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<void>;
}
