import { Router } from 'express';

import { RoleController } from './role.controller.js';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';

const roleController = new RoleController();

const router = Router();
router.get(
  '/',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  roleController.findAll,
);

export default router;
