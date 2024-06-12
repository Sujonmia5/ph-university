import express from 'express';
import { userController } from './controller.user';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from '../student/validation.student';
import { zodValidationFacultySchema } from '../faculty/validation.faculty';
import { zodAdminValidationSchema } from '../admin/validation.admin';

const route = express.Router();

route.post(
  '/create-student',
  validateRequestData(studentZodSchema.zodValidationStudentSchema),
  userController.createStudent,
);

route.post(
  '/create-faculty',
  validateRequestData(zodValidationFacultySchema),
  userController.createFaculty,
);
route.post(
  '/create-admin',
  validateRequestData(zodAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = route;
