import { IQuestion } from '../entities/models/question.interface.js';

export interface IQuestionRepository {
  create(data: Partial<IQuestion>[]): Promise<IQuestion[]>;
  findById(id: string): Promise<IQuestion | null>;
  findAllByFeedbackId(feedbackId: string): Promise<IQuestion[]>;
}
