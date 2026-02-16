import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';

import { IFeedback } from '../../entities/models/feedback.interface.js';
import { Feedback } from '../../entities/feedback.entity.js';

import { IFeedbackRepository } from '../feedback.repository.interface.js';

export class FeedbackRepository implements IFeedbackRepository {
  private repository: Repository<Feedback>;

  constructor() {
    this.repository = appDataSource.getRepository(Feedback);
  }

  async create(data: Partial<IFeedback>): Promise<IFeedback> {
    return this.repository.save(data);
  }

  async findAllByClassId(classId: string): Promise<IFeedback[]> {
    return this.repository.find({
      where: { classId },
    });
  }

  async findAllByUserId(userId: string): Promise<IFeedback[]> {
    return this.repository.find({
      where: { userId },
    });
  }
}
