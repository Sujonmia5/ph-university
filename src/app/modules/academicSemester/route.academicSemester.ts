import express from 'express';
import { academicSemesterControllers } from './controller.academicSemester';
import validateRequestData from '../../middleware/validationRequest';
import { SemesterZodSchema } from './validation.academicSemester';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicSemesterControllers.academicSemesterGetAll,
);

route.get(
  '/:Id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicSemesterControllers.academicSemesterGetId,
);

route.put(
  '/:Id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(SemesterZodSchema.zodUpdatedAcademicSemesterSchema),
  academicSemesterControllers.updateAcademicSemester,
);

route.post(
  '/create-semester',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(SemesterZodSchema.zodAcademicSemesterSchema),
  academicSemesterControllers.academicSemesterCreateController,
);

export const academicRoutes = route;
