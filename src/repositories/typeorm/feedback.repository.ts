import { In, Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';

import {
  IFeedback,
  IFeedbackStatsRaw,
} from '../../entities/models/feedback.interface.js';
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

  async findById(id: string): Promise<IFeedback | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['questions', 'class', 'class.school', 'user'],
      order: { questions: { order: 'ASC' } },
    });
  }

  async findAllByClassId(classId: string): Promise<IFeedback[]> {
    return this.repository.find({
      where: { classId },
      relations: ['questions', 'class', 'class.school', 'user'],
      order: { questions: { order: 'ASC' } },
    });
  }

  async findAllByUserId(userId: string): Promise<IFeedback[]> {
    return this.repository.find({
      where: { userId },
      relations: ['questions', 'class', 'class.school', 'user'],
      order: { questions: { order: 'ASC' } },
    });
  }

  async findAllByClassIds(classIds: string[]): Promise<IFeedback[]> {
    return this.repository.find({
      where: { classId: In(classIds) },
      relations: ['questions', 'class', 'class.school', 'user'],
      order: { questions: { order: 'ASC' } },
    });
  }

  async getStats(feedbackId: string): Promise<IFeedbackStatsRaw | undefined> {
    return this.repository
      .createQueryBuilder('f')
      .leftJoin('f.questions', 'q')
      .leftJoin('q.answers', 'a')
      .select('f.id', 'feedbackId')
      .addSelect('f.title', 'title')
      .addSelect('COUNT(DISTINCT a.userId)', 'totalStudentsAnswered')
      .addSelect('AVG(a.outcome)', 'averageScore')
      .where('f.id = :id', { id: feedbackId })
      .groupBy('f.id')
      .getRawOne<IFeedbackStatsRaw>();
  }
}
