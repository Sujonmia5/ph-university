import express from 'express';
import { studentController } from './controller.student';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from './validation.student';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';
const route = express.Router();

route.get(
  '/',
  auth(User_Role.admin, User_Role.superAdmin),
  studentController.controllerStudentGetAll,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(studentZodSchema.ZodValidationUpdatedStudentSchema),
  studentController.controllerStudentUpdated,
);

route.get(
  '/:id',
  auth(User_Role.faculty, User_Role.admin, User_Role.superAdmin),
  studentController.controllerStudentGetSingle,
);

route.delete(
  '/:id',
  auth(User_Role.admin, User_Role.superAdmin),
  studentController.controllerStudentDeleted,
);

export const studentRoutes = route;
