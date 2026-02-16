import { IAnswer } from './answer.interface.js';

export interface IQuestion {
  id: string;
  title: string;
  description?: string;
  order: number;
  active: boolean;
  feedbackId: string;
  createdAt: Date;
  updatedAt: Date;
  answers?: IAnswer[];
}
