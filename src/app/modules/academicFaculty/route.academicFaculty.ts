import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { academicFacultyZodSchema } from './validation.academicFaculty';
import { academicFacultyController } from './controller.academicFaculty';
import auth from '../../middleware/auth';

const route = express.Router();

route.post(
  '/create-academic-faculty',
  auth('admin'),
  validateRequestData(academicFacultyZodSchema.zodAcademicFacultySchema),
  academicFacultyController.createAcademicFacultyController,
);

route.get('/', academicFacultyController.getAllAcademicFacultyController);

route.get('/:id', academicFacultyController.getSingleAcademicFacultyController);

route.patch(
  '/:id',
  auth('admin'),
  validateRequestData(academicFacultyZodSchema.zodAcademicFacultySchema),
  academicFacultyController.updateAcademicFacultyController,
);

export const academicFacultyRoutes = route;
