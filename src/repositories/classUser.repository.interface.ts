import { IClassUser } from '../entities/models/classUser.interface.js';

export interface IClassUserRepository {
  create(data: Partial<IClassUser>): Promise<IClassUser>;
  findByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<IClassUser | null>;
  findByIdWithDetails(id: string): Promise<IClassUser | null>;
}
