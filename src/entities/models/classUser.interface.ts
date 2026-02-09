import { IClass } from './class.interface.js';
import { IUser } from './user.interface.js';

export interface IClassUser {
  classId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  status: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  class?: IClass;
  user?: IUser;
}
