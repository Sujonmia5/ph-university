import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { academicFacultyZodSchema } from './validation.academicFaculty';
import { academicFacultyController } from './controller.academicFaculty';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.post(
  '/create-academic-faculty',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(academicFacultyZodSchema.zodAcademicFacultySchema),
  academicFacultyController.createAcademicFacultyController,
);

route.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicFacultyController.getAllAcademicFacultyController,
);

route.get(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  academicFacultyController.getSingleAcademicFacultyController,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(academicFacultyZodSchema.zodAcademicFacultySchema),
  academicFacultyController.updateAcademicFacultyController,
);

export const academicFacultyRoutes = route;
