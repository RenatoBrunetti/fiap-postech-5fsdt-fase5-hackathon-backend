import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createQuestionSchema } from './schemas/createQuestion.schema.js';
import { findAllByFeedbackIdSchema } from './schemas/findAllByFeedbackId.schema.js';
import { findByIdSchema } from './schemas/findById.schema.js';

// Controllers
import { QuestionController } from './question.controller.js';

const questionController = new QuestionController();
const router = Router();

router.post(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(createQuestionSchema),
  questionController.create,
);

router.get(
  '/feedback/:feedbackId',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findAllByFeedbackIdSchema),
  questionController.findAllByFeedbackId,
);

router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findByIdSchema),
  questionController.findById,
);

export default router;
