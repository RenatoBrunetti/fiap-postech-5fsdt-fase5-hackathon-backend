import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createFeedbackSchema } from './schemas/createFeedback.schema.js';
import { findByIdSchema } from './schemas/findById.schema.js';
import { findAllByClassIdSchema } from './schemas/findAllByClassId.schema.js';
import { findAllByUserIdSchema } from './schemas/findAllByUserId.schema.js';

// Controllers
import { FeedbackController } from './feedback.controller.js';

const feedbackController = new FeedbackController();
const router = Router();

router.post(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(createFeedbackSchema),
  feedbackController.create,
);

router.get(
  '/class/:classId',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findAllByClassIdSchema),
  feedbackController.findAllByClassId,
);

router.get(
  '/user/:userId',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findAllByUserIdSchema),
  feedbackController.findAllByUserId,
);

router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findByIdSchema),
  feedbackController.findById,
);

export default router;
