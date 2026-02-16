import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createAnswerSchema } from './schemas/createAnswer.schema.js';
import { findAllByQuestionIdSchema } from './schemas/findAllByQuestionId.schema.js';
import { findByIdSchema } from './schemas/findById.schema.js';

// Controllers
import { AnswerController } from './answer.controller.js';

const answerController = new AnswerController();
const router = Router();

// Students send their answers
router.post(
  '/',
  jwtAuth,
  authorize(['Student', 'Admin']),
  validate(createAnswerSchema),
  answerController.create,
);

// Teachers or Admins can view the answers of a question
router.get(
  '/question/:questionId',
  jwtAuth,
  authorize(['Teacher', 'Admin']),
  validate(findAllByQuestionIdSchema),
  answerController.findAllByQuestionId,
);

router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findByIdSchema),
  answerController.findById,
);

export default router;
