import { IClass } from './class.interface.js';
import { IUser } from './user.interface.js';

export interface IClassUser {
  id?: string;
  startDate: Date;
  endDate?: Date | null;
  active: boolean;
  classId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  class?: IClass;
  user?: IUser;
}
