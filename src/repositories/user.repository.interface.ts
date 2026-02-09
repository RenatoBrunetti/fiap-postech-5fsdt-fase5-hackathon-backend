import { IUser } from '../entities/models/user.interface.js';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findByDocument(document: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByEmailLogin(email: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<void>;
}
