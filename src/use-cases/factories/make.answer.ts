import { AnswerRepository } from '../../repositories/typeorm/answer.repository.js';
import { QuestionRepository } from '../../repositories/typeorm/question.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';

import { AnswerUseCase } from '../answer.usecase.js';

export function makeAnswerUseCase() {
  const answerRepository = new AnswerRepository();
  const questionRepository = new QuestionRepository();
  const userRepository = new UserRepository();
  return new AnswerUseCase(
    answerRepository,
    questionRepository,
    userRepository,
  );
}
