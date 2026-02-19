import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { assignClassSchema } from './schemas/assignClass.schema.js';
import { unassignClassSchema } from './schemas/unassignClass.schema.js';
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

// Unassign User from Class
router.post(
  '/unassign',
  jwtAuth,
  authorize(['Admin']),
  validate(unassignClassSchema),
  classUserController.unassign,
);

router.get(
  '/user/:userId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findByUserSchema),
  classUserController.findByUser,
);

export default router;
