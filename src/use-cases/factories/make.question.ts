import { FeedbackRepository } from '../../repositories/typeorm/feedback.repository.js';
import { QuestionRepository } from '../../repositories/typeorm/question.repository.js';

import { QuestionUseCase } from '../question.usecase.js';

export function makeQuestionUseCase() {
  const questionRepository = new QuestionRepository();
  const feedbackRepository = new FeedbackRepository();
  return new QuestionUseCase(questionRepository, feedbackRepository);
}
