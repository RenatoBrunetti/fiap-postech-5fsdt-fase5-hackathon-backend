import { IAnswerRepository } from '../repositories/answer.repository.interface.js';
import { IQuestionRepository } from '../repositories/question.repository.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

interface QuestionDataType {
  questionId: string;
  outcome: number;
}

interface AnswerDataType {
  userId: string;
  questions: QuestionDataType[];
}

export class AnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private questionRepository: IQuestionRepository,
    private userRepository: IUserRepository,
  ) {}

  async create(data: AnswerDataType) {
    // 1. Check if the user exists
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new ApiError('User not found', 404);

    // 2. Check if the question exists
    for (const question of data.questions) {
      const questionExists = await this.questionRepository.findById(
        question.questionId,
      );
      if (!questionExists)
        throw new ApiError(
          `Question with id ${question.questionId} not found`,
          404,
        );
    }

    // 3. Persistence
    const dataCreate = data.questions.map((question) => ({
      userId: data.userId,
      questionId: question.questionId,
      outcome: question.outcome,
    }));
    return await this.answerRepository.create(dataCreate);
  }

  async findById(id: string) {
    return await this.answerRepository.findById(id);
  }

  async findAllByQuestionId(questionId: string) {
    // 1. Check if the question exists
    const question = await this.questionRepository.findById(questionId);
    if (!question) throw new ApiError('Question not found', 404);

    // 2. Persistence
    return await this.answerRepository.findAllByQuestionId(questionId);
  }
}
