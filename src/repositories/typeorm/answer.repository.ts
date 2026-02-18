import { In, Repository } from 'typeorm';

import { appDataSource } from '../../lib/typeorm/typeorm.js';

import { IAnswer } from '../../entities/models/answer.interface.js';
import { Answer } from '../../entities/answer.entity.js';

import { IAnswerRepository } from '../answer.repository.interface.js';

export class AnswerRepository implements IAnswerRepository {
  private repository: Repository<Answer>;

  constructor() {
    this.repository = appDataSource.getRepository(Answer);
  }

  async create(data: Partial<IAnswer>[]): Promise<IAnswer[]> {
    return this.repository.save(data);
  }

  async findById(id: string): Promise<IAnswer | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllByQuestionId(questionId: string): Promise<IAnswer[]> {
    return this.repository.find({
      where: { questionId },
    });
  }

  async findAllByQuestionIds(questionIds: string[]): Promise<IAnswer[]> {
    return this.repository.find({
      where: { questionId: In(questionIds) },
      relations: ['question'],
      order: { question: { order: 'ASC' } },
    });
  }

  async findAllByQuestionIdsAndUserId(
    questionIds: string[],
    userId: string,
  ): Promise<IAnswer[]> {
    return this.repository.find({
      where: {
        questionId: In(questionIds),
        userId,
      },
    });
  }
}
