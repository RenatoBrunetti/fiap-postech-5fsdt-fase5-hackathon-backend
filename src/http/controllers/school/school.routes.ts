import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createSchoolSchema } from './schemas/createSchool.schema.js';

// Controllers
import { SchoolController } from './school.controller.js';

const schoolController = new SchoolController();
const router = Router();

// Create School
router.post(
  '/',
  jwtAuth,
  authorize(['Admin']),
  validate(createSchoolSchema),
  schoolController.create,
);
// FindAll Schools
router.get(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  schoolController.findAll,
);
// Delete School
router.delete('/:id', jwtAuth, authorize(['Admin']), schoolController.delete);
// Find School By Id
router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  schoolController.findById,
);

export default router;
