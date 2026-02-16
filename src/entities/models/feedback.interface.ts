import { IQuestion } from './question.interface.js';

export interface IFeedback {
  id: string;
  title: string;
  active: boolean;
  classId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  questions?: IQuestion[];
}

export interface IFeedbackStatsRaw {
  feedbackId: string;
  title: string;
  totalStudentsAnswered: string;
  averageScore: string;
}
