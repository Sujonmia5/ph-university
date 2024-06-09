import express from 'express';
import { userController } from './controller.user';
import validateRequestData from '../middleware/validationRequest';
import { studentZodSchema } from '../student/validation.student';

const route = express.Router();

route.post(
  '/create-student',
  validateRequestData(studentZodSchema.zodValidationStudentSchema),
  userController.createStudent,
);

export const userRoutes = route;
