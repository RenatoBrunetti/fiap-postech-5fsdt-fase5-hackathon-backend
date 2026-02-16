import { Request, Response } from 'express';

import { makeQuestionUseCase } from '../../../use-cases/factories/make.question.js';

// Schemas
import { CreateQuestionType } from './schemas/createQuestion.schema.js';
import { FindByIdType } from './schemas/findById.schema.js';
import { FindAllByFeedbackIdType } from './schemas/findAllByFeedbackId.schema.js';

export class QuestionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { feedbackId, questions } = req.body as CreateQuestionType;
    // User data is added to the request by the authentication middleware
    const userPermissionData = req.user;
    const createQuestionUseCase = makeQuestionUseCase();
    const question = await createQuestionUseCase.create(
      { feedbackId, questions },
      userPermissionData,
    );
    return res.status(201).send(question);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as FindByIdType;
    const findQuestionByIdUseCase = makeQuestionUseCase();
    const question = await findQuestionByIdUseCase.findById(id);
    return res.status(200).send(question);
  }

  async findAllByFeedbackId(req: Request, res: Response): Promise<Response> {
    const { feedbackId } = req.params as FindAllByFeedbackIdType;
    const findAllByFeedbackIdUseCase = makeQuestionUseCase();
    const questions =
      await findAllByFeedbackIdUseCase.findAllByFeedbackId(feedbackId);
    return res.status(200).send(questions);
  }
}
