import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createUserBodySchema } from './schemas/createUser.schema.js';

// Controllers
import { UserController } from './user.controller.js';

const userController = new UserController();
const router = Router();

// Create User - Admin only
router.post(
  '/',
  jwtAuth,
  authorize(['Admin']),
  validate(createUserBodySchema),
  userController.createUser,
);
// Get All Users - Admin only
router.get('/', jwtAuth, authorize(['Admin']), userController.findAllUsers);

export default router;
