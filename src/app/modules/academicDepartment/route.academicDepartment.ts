import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { academicDepartmentZodSchema } from './validation.academicDepartment';
import { academicDepartmentController } from './controller.academicDepartment';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';
const route = express.Router();

route.post(
  '/create-academic-department',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(academicDepartmentZodSchema.zodAcademicDepartmentSchema),
  academicDepartmentController.createAcademicDepartmentController,
);

route.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicDepartmentController.getAllAcademicDepartmentController,
);

route.get(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicDepartmentController.getSingleAcademicDepartmentController,
);
route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(
    academicDepartmentZodSchema.zodUpdatedAcademicDepartmentSchema,
  ),
  academicDepartmentController.updateAcademicDepartmentController,
);

export const academicDepartmentRoutes = route;
