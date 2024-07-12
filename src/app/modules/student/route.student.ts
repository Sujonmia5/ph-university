import express from 'express';
import { studentController } from './controller.student';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from './validation.student';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';
const route = express.Router();

route.get(
  '/',
  auth('admin', 'faculty'),
  studentController.controllerStudentGetAll,
);

route.patch(
  '/:id',
  auth(User_Role.student),
  validateRequestData(studentZodSchema.ZodValidationUpdatedStudentSchema),
  studentController.controllerStudentUpdated,
);

route.get(
  '/:id',
  auth(User_Role.faculty, User_Role.admin),
  studentController.controllerStudentGetSingle,
);

route.delete(
  '/:id',
  auth(User_Role.admin),
  studentController.controllerStudentDeleted,
);

export const studentRoutes = route;
