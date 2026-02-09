import { Router } from 'express';

// Middlewares
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { authLoginSchema } from './schemas/login.schema.js';
import { authRefreshTokenSchema } from './schemas/refreshToken.schema.js';

// Controllers
import { AuthController } from './auth.controller.js';

const authController = new AuthController();

const router = Router();

// Login
router.post('/login', validate(authLoginSchema), authController.login);
// Refresh Token
router.post(
  '/refreshToken',
  jwtAuth,
  validate(authRefreshTokenSchema),
  authController.refreshToken,
);
// Logout
router.post(
  '/logout',
  jwtAuth,
  validate(authRefreshTokenSchema),
  authController.logout,
);

export default router;
