import { AnswerRepository } from '../../repositories/typeorm/answer.repository.js';
import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';
import { FeedbackRepository } from '../../repositories/typeorm/feedback.repository.js';
import { UserRepository } from '../../repositories/typeorm/user.repository.js';

import { FeedbackUseCase } from '../feedback.usecase.js';

export function makeFeedbackUseCase() {
  const feedbackRepository = new FeedbackRepository();
  const classUserRepository = new ClassUserRepository();
  const userRepository = new UserRepository();
  const answerRepository = new AnswerRepository();

  return new FeedbackUseCase(
    feedbackRepository,
    classUserRepository,
    userRepository,
    answerRepository,
  );
}
