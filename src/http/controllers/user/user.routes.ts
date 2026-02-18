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

// Create User
router.post(
  '/',
  jwtAuth,
  authorize(['Admin']),
  validate(createUserBodySchema),
  userController.create,
);
// Find All Users
router.get('/', jwtAuth, authorize(['Admin']), userController.findAll);
// Find Me
router.get('/me', jwtAuth, userController.findMe);

export default router;
