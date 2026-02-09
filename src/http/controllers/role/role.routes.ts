import { Router } from 'express';

import { RoleController } from './role.controller.js';

const roleController = new RoleController();

const router = Router();
router.get('/', roleController.findAllRoles);

export default router;
