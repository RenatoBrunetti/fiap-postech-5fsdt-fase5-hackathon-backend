import { IAnswerRepository } from '../repositories/answer.repository.interface.js';
import { IClassUserRepository } from '../repositories/classUser.repository.interface.js';
import { IFeedbackRepository } from '../repositories/feedback.repository.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';
import { IQuestionRepository } from '../repositories/question.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';
import { IFeedback } from '../entities/models/feedback.interface.js';

interface CreateFeedbackType {
  title: string;
  classId: string;
  userId: string;
}

interface CreateFeedbackQuestionType extends CreateFeedbackType {
  questions: {
    title: string;
    description?: string;
    order: number;
  }[];
}

interface UserPermissionData {
  id: string;
  role: string;
}

export interface IFeedbackStatsFormatted {
  feedbackId: string;
  title: string;
  totalStudentsAnswered: number;
  averageScore: number;
}

export class FeedbackUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private classUserRepository: IClassUserRepository,
    private userRepository: IUserRepository,
    private answerRepository: IAnswerRepository,
    private questionRepository: IQuestionRepository,
  ) {}

  async create(
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

  async createFeedbackAndQuestions(data: CreateFeedbackQuestionType) {
    const { title, classId, userId, questions } = data;
    const feedback = await this.feedbackRepository.create({
      title,
      classId,
      userId,
    });
    if (!feedback) {
      throw new ApiError('Failed to create feedback', 500);
    }
    const dataCreate = questions.map((question) => ({
      ...question,
      feedbackId: feedback.id,
    }));
    const questionsCreate = await this.questionRepository.create(dataCreate);
    if (!questionsCreate) {
      throw new ApiError('Failed to create questions', 500);
    }

    return await this.feedbackRepository.findById(feedback.id);
  }

  async findById(id: string, userPermissionData: UserPermissionData) {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new ApiError('Feedback not found', 404);
    }

    const response: IFeedback & { isAnswered?: boolean } = { ...feedback };
    if (userPermissionData.role === 'Student') {
      const questionIds =
        feedback.questions?.map((question) => question.id) || [];
      const answers = await this.answerRepository.findAllByQuestionIdsAndUserId(
        questionIds,
        userPermissionData.id,
      );

      // Add a 'isAnswered' property to the feedback based on whether the student has answered all questions in that feedback without duplicating feedback data
      const feedbackQuestionIds = feedback.questions?.map((q) => q.id) || [];
      const answeredQuestionIds = answers.map((a) => a.questionId);
      const isAnswered = feedbackQuestionIds.every((qid) =>
        answeredQuestionIds.includes(qid),
      );
      response['isAnswered'] = isAnswered;
    }

    return response;
  }

  async findAllByClassId(classId: string) {
    return await this.feedbackRepository.findAllByClassId(classId);
  }

  async findAllByUserId(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    const userAssignments =
      await this.classUserRepository.findAllByUserId(userId);
    if (userAssignments.length === 0) {
      throw new ApiError('You are not assigned to any class', 403);
    }
    const classIds = userAssignments.map((assignment) => assignment.classId);
    const feedbacks = await this.feedbackRepository.findAllByClassIds(classIds);

    let response = [...feedbacks];
    if (user.role?.name === 'Student') {
      const questionIds = feedbacks
        .map((feedback) => feedback.questions?.map((question) => question.id))
        .flat()
        .filter((id): id is string => id !== undefined);

      const answers = await this.answerRepository.findAllByQuestionIdsAndUserId(
        questionIds,
        userId,
      );

      // Add a 'isAnswered' property to each feedback based on whether the student has answered all questions in that feedback witoud duplicating feedback data
      response = feedbacks.map((feedback) => {
        const feedbackQuestionIds = feedback.questions?.map((q) => q.id) || [];
        const answeredQuestionIds = answers.map((a) => a.questionId);
        const isAnswered = feedbackQuestionIds.every((qid) =>
          answeredQuestionIds.includes(qid),
        );
        return { ...feedback, isAnswered };
      });
    }

    return response;
  }

  async findFeedbackStats(
    feedbackId: string,
    userPermissionData: UserPermissionData,
  ): Promise<IFeedbackStatsFormatted> {
    const feedback = await this.feedbackRepository.findById(feedbackId);
    if (!feedback) throw new ApiError('Feedback not found', 404);

    if (userPermissionData.role === 'Student') {
      throw new ApiError('Access denied to these statistics', 403);
    }

    const stats = await this.feedbackRepository.getStats(feedbackId);
    if (!stats)
      throw new ApiError('No statistics available for this feedback', 404);

    return {
      feedbackId: stats.feedbackId,
      title: stats.title,
      totalStudentsAnswered: Number(stats.totalStudentsAnswered) || 0,
      averageScore: stats.averageScore
        ? Number(parseFloat(stats.averageScore).toFixed(2))
        : 0,
    };
  }
}
