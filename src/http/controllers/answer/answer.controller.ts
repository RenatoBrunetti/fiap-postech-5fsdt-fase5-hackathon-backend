import { Request, Response } from 'express';

import { makeAnswerUseCase } from '../../../use-cases/factories/make.answer.js';

// Schemas
import { CreateAnswerType } from './schemas/createAnswer.schema.js';
import { FindAllByQuestionIdType } from './schemas/findAllByQuestionId.schema.js';
import { FindByIdType } from './schemas/findById.schema.js';

export class AnswerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { questions, feedbackId } = req.body as CreateAnswerType;
    const userId = req.user.id; // Injected by auth middleware
    const answerUseCase = makeAnswerUseCase();
    const answers = await answerUseCase.create({
      userId,
      feedbackId,
      questions,
    });
    return res.status(201).send(answers);
  }

  async findAllByQuestionId(req: Request, res: Response): Promise<Response> {
    const { questionId } = req.params as FindAllByQuestionIdType;
    const answerUseCase = makeAnswerUseCase();
    const answers = await answerUseCase.findAllByQuestionId(questionId);
    return res.status(200).send(answers);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as FindByIdType;
    const answerUseCase = makeAnswerUseCase();
    const answer = await answerUseCase.findById(id);
    if (!answer) return res.status(404).send({ message: 'Answer not found' });
    return res.status(200).send(answer);
  }
}
