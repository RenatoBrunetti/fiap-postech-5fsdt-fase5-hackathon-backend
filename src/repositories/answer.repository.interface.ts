import { IAnswer } from '../entities/models/answer.interface.js';

export interface IAnswerRepository {
  create(data: Partial<IAnswer>[]): Promise<IAnswer[]>;
  findById(id: string): Promise<IAnswer | null>;
  findAllByQuestionId(questionId: string): Promise<IAnswer[]>;
}
