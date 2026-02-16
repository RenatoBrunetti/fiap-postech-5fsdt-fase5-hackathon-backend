import { Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';

import { IQuestion } from '../../entities/models/question.interface.js';
import { Question } from '../../entities/question.entity.js';

import { IQuestionRepository } from '../question.repository.interface.js';

export class QuestionRepository implements IQuestionRepository {
  private repository: Repository<Question>;

  constructor() {
    this.repository = appDataSource.getRepository(Question);
  }

  async create(data: Partial<IQuestion>[]): Promise<IQuestion[]> {
    return this.repository.save(data);
  }

  async findById(id: string): Promise<IQuestion | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['answers'],
      order: { order: 'ASC' },
    });
  }

  async findAllByFeedbackId(feedbackId: string): Promise<IQuestion[]> {
    return this.repository.find({
      where: { feedbackId },
      relations: ['answers'],
      order: { order: 'ASC' },
    });
  }
}
