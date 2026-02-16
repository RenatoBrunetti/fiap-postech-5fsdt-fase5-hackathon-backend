import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { assignClassSchema } from './schemas/assignClass.schema.js';
import { findByUserSchema } from './schemas/findByUser.schema.js';

// Controllers
import { ClassUserController } from './classUser.controller.js';

const classUserController = new ClassUserController();
const router = Router();

// Assign User to Class
router.post(
  '/assign',
  jwtAuth,
  authorize(['Admin']),
  validate(assignClassSchema),
  classUserController.assign,
);

router.get(
  '/user/:userId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findByUserSchema),
  classUserController.findByUser,
);

export default router;
