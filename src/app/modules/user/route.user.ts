import express from 'express';
import { userController } from './controller.user';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from '../student/validation.student';
import { zodValidationFacultySchema } from '../faculty/validation.faculty';
import { zodAdminValidationSchema } from '../admin/validation.admin';
import { User_Role } from './constants.user';
import auth from '../../middleware/auth';
import { zodStatusUpdatedSchema } from './validation.user';
import { upload } from '../utils/imageUpload';
import { fromDataParse } from '../../middleware/fromDataParse';

const route = express.Router();

route.post(
  '/create-student',
  auth(User_Role.admin),
  upload.single('file'),
  fromDataParse,
  validateRequestData(studentZodSchema.zodValidationStudentSchema),
  userController.createStudent,
);

route.post(
  '/create-faculty',
  auth(User_Role.admin),
  upload.single('file'),
  fromDataParse,
  validateRequestData(zodValidationFacultySchema),
  userController.createFaculty,
);
route.post(
  '/create-admin',
  auth(User_Role.superAdmin),
  upload.single('file'),
  fromDataParse,
  validateRequestData(zodAdminValidationSchema),
  userController.createAdmin,
);
route.post(
  '/change-status/:id',
  auth('admin'),
  validateRequestData(zodStatusUpdatedSchema),
  userController.changeStatus,
);

route.get(
  '/me',
  auth('student', 'faculty', 'admin', 'superAdmin'),
  userController.getMe,
);

export const userRoutes = route;
