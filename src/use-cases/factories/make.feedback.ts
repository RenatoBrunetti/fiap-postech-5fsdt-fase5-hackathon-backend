import { FeedbackRepository } from '../../repositories/typeorm/feedback.repository.js';
import { ClassUserRepository } from '../../repositories/typeorm/classUser.repository.js';

import { FeedbackUseCase } from '../feedback.usecase.js';

export function makeFeedbackUseCase() {
  const feedbackRepository = new FeedbackRepository();
  const classUserRepository = new ClassUserRepository();

  return new FeedbackUseCase(feedbackRepository, classUserRepository);
}
