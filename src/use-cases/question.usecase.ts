import { IQuestionRepository } from '../repositories/question.repository.interface.js';
import { IFeedbackRepository } from '../repositories/feedback.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

interface QuestionDataContentType {
  title: string;
  description?: string;
  order: number;
}

interface QuestionDataType {
  feedbackId: string;
  questions: QuestionDataContentType[];
}

interface UserPermissionData {
  id: string;
  role: string;
}

export class QuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private feedbackRepository: IFeedbackRepository,
  ) {}

  async create(data: QuestionDataType, userPermissionData: UserPermissionData) {
    // 1. Check if the feedback exists
    const feedback = await this.feedbackRepository.findById(data.feedbackId);
    if (!feedback) throw new ApiError('Feedback not found', 404);

    // 2. Property Validation: Only the creator of the Feedback or Admin can add questions
    if (userPermissionData.role !== 'Admin') {
      throw new ApiError(
        'You do not have permission to add questions to this feedback',
        403,
      );
    }

    // 3. Persistence
    const dataCreate = data.questions.map((question) => ({
      ...question,
      feedbackId: data.feedbackId,
    }));
    return await this.questionRepository.create(dataCreate);
  }

  async findById(id: string) {
    return await this.questionRepository.findById(id);
  }

  async findAllByFeedbackId(feedbackId: string) {
    // 1. Check if the feedback exists
    const feedback = await this.feedbackRepository.findById(feedbackId);
    if (!feedback) throw new ApiError('Feedback not found', 404);

    // 2. Persistence
    return await this.questionRepository.findAllByFeedbackId(feedbackId);
  }
}
