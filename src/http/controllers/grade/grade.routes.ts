import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { findGradeByCategorySchema } from './schemas/findGradeByCategory.schema.js';
import { findGradeByIdSchema } from './schemas/findGradeById.schema.js';
import { findGradeByNameSchema } from './schemas/findGradeByName.schema.js';

// Controllers
import { GradeController } from './grade.controller.js';

const gradeController = new GradeController();
const router = Router();

// FindAll Grades
router.get(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  gradeController.findAll,
);
// Find Grade by ID
router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findGradeByIdSchema),
  gradeController.findById,
);
// Find Grade by Name
router.get(
  '/name/:name',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findGradeByNameSchema),
  gradeController.findByName,
);
// Find Grades by Category
router.get(
  '/category/:category',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findGradeByCategorySchema),
  gradeController.findByCategory,
);

export default router;
