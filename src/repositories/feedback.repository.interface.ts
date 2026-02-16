import { IFeedback } from '../entities/models/feedback.interface.js';

export interface IFeedbackRepository {
  create(data: Partial<IFeedback>): Promise<IFeedback>;
  findById(id: string): Promise<IFeedback | null>;
  findAllByClassId(classId: string): Promise<IFeedback[]>;
  findAllByUserId(userId: string): Promise<IFeedback[]>;
}
