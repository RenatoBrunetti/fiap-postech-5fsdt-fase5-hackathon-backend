import { IClassUserRepository } from '../repositories/classUser.repository.interface.js';
import { IFeedbackRepository } from '../repositories/feedback.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

interface CreateFeedbackType {
  title: string;
  classId: string;
  userId: string;
}

interface UserPermissionData {
  id: string;
  role: string;
}

export class FeedbackUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private classUserRepository: IClassUserRepository,
  ) {}

  async execute(
    data: CreateFeedbackType,
    userPermissionData: UserPermissionData,
  ) {
    const { title, classId, userId } = data;
    // 1. If the user is not an admin, check if they are assigned to the class (Gatekeeper)
    if (userPermissionData.role !== 'Admin') {
      const assignment = await this.classUserRepository.findByUserAndClass(
        userId,
        classId,
      );

      // ClassUser not found or user is not active in the class
      if (!assignment) {
        throw new ApiError('You are not assigned to this class', 403);
      }
    }

    // 2. Create the feedback
    return await this.feedbackRepository.create({
      title,
      classId,
      userId,
    });
  }

  async findById(id: string) {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new ApiError('Feedback not found', 404);
    }
    return feedback;
  }

  async findAllByClassId(classId: string) {
    return await this.feedbackRepository.findAllByClassId(classId);
  }

  async findAllByUserId(userId: string) {
    return await this.feedbackRepository.findAllByUserId(userId);
  }
}
