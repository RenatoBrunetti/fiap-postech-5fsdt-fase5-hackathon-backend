import { IFeedback } from './feedback.interface.js';
import { IUser } from './user.interface.js';

export interface IFeedbackUser {
  feedbackId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  status: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  feedback?: IFeedback;
  user?: IUser;
}
