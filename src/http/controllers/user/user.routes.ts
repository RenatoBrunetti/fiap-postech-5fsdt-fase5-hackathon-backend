import { Router } from 'express';

// Middlewares
import { authorize } from '../../middlewares/roleCheck.middleware.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';
import { validate } from '../../middlewares/validate.js';

// Schemas
import { createUserBodySchema } from './schemas/createUser.schema.js';
import { createAndAssignSchema } from './schemas/createAndAssign.schema.js';
import { findByRoleNameSchema } from './schemas/findByRoleName.schema.js';
import { findBySchoolSchema } from './schemas/findBySchoolName.schema.js';
import { searchUsersSchema } from './schemas/searchUsers.schema.js';
import { findByClassSchema } from './schemas/findByClass.schema.js';
import { findByIdSchema } from './schemas/findById.schema.js';

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
//  Create and Assign User
router.post(
  '/create-and-assign',
  jwtAuth,
  authorize(['Admin']),
  validate(createAndAssignSchema),
  userController.createAndAssign,
);

// Find All Users
router.get('/', jwtAuth, authorize(['Admin']), userController.findAll);
// Find All Users By RoleName
router.get(
  '/role/:roleName',
  jwtAuth,
  authorize(['Admin']),
  validate(findByRoleNameSchema),
  userController.findAllByRoleName,
);
// Find All Users By School
router.get(
  '/teachers/school/:schoolId',
  jwtAuth,
  authorize(['Admin']),
  validate(findBySchoolSchema),
  userController.findTeachersBySchool,
);
// Find Me
router.get('/me', jwtAuth, userController.findMe);
// Search Users by RoleName and SearchQuery
router.get(
  '/search',
  jwtAuth,
  authorize(['Admin']),
  validate(searchUsersSchema),
  userController.searchUsers,
);

router.get(
  '/students/:classId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findByClassSchema),
  userController.findStudentByClass,
);

router.get(
  '/teachers/:classId',
  jwtAuth,
  authorize(['Admin', 'Teacher']),
  validate(findByClassSchema),
  userController.findTeachersByClass,
);

router.get(
  '/:id',
  jwtAuth,
  authorize(['Admin', 'Teacher', 'Student']),
  validate(findByIdSchema),
  userController.findById,
);

export default router;
