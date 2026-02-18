import { Request, Response } from 'express';

import { makeFeedbackUseCase } from '../../../use-cases/factories/make.feedback.js';

import { CreateFeedbackType } from './schemas/createFeedback.schema.js';
import { FindByIdType } from './schemas/findById.schema.js';
import { FindAllByClassIdType } from './schemas/findAllByClassId.schema.js';
import { FindAllByUserIdType } from './schemas/findAllByUserId.schema.js';
import { FindFeedbackStatsType } from './schemas/findFeedbackStatsSchema.js';
import { CreateFeedbackQuestionType } from './schemas/createFeedbackQuestion.schema.js';

export class FeedbackController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, classId, userId } = req.body as CreateFeedbackType;
    // User data is added to the request by the authentication middleware
    const userPermissionData = req.user;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedback = await feedbackUseCase.create(
      { title, classId, userId },
      userPermissionData,
    );
    return res.status(201).json(feedback);
  }

  async createFeedbackAndQuestions(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { title, classId, userId, questions } =
      req.body as CreateFeedbackQuestionType;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedback = await feedbackUseCase.createFeedbackAndQuestions({
      title,
      classId,
      userId,
      questions,
    });
    return res.status(201).json(feedback);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as FindByIdType;
    // User data is added to the request by the authentication middleware
    const userPermissionData = req.user;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedback = await feedbackUseCase.findById(id, userPermissionData);
    return res.status(200).json(feedback);
  }

  async findAllByClassId(req: Request, res: Response): Promise<Response> {
    const { classId } = req.params as FindAllByClassIdType;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedbacks = await feedbackUseCase.findAllByClassId(classId);
    return res.status(200).json(feedbacks);
  }

  async findAllByUserId(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params as FindAllByUserIdType;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedbacks = await feedbackUseCase.findAllByUserId(userId);
    return res.status(200).json(feedbacks);
  }

  async findFeedbackStats(req: Request, res: Response): Promise<Response> {
    const { feedbackId } = req.params as FindFeedbackStatsType;
    // User data is added to the request by the authentication middleware
    const userPermissionData = req.user;
    const feedbackUseCase = makeFeedbackUseCase();
    const feedbackStats = await feedbackUseCase.findFeedbackStats(
      feedbackId,
      userPermissionData,
    );
    return res.status(200).json(feedbackStats);
  }
}
