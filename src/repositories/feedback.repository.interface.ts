import { IFeedback } from '../entities/models/feedback.interface.js';

export interface IFeedbackRepository {
  create(data: Partial<IFeedback>): Promise<IFeedback>;
  findAllByClassId(classId: string): Promise<IFeedback[]>;
  findAllByUserId(userId: string): Promise<IFeedback[]>;
}
