import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createClassSchema } from './schemas/createClass.schema.js';
import { findClassBySchoolSchema } from './schemas/findClassBySchool.schema.js';
import { findClassByGradeSchema } from './schemas/findClassByGrade.schema.js';

// Controllers
import { ClassController } from './class.controller.js';

const classController = new ClassController();
const router = Router();

// Create Class
router.post(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(createClassSchema),
  classController.create,
);
// Find Classes By School
router.get(
  '/school/:schoolId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findClassBySchoolSchema),
  classController.findBySchool,
);
// Find Classes By Grade
router.get(
  '/grade/:gradeId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findClassByGradeSchema),
  classController.findByGrade,
);

export default router;
