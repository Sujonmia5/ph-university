import express from 'express';
import { academicSemesterControllers } from './controller.academicSemester';
import validateRequestData from '../../middleware/validationRequest';
import { SemesterZodSchema } from './validation.academicSemester';
import auth from '../../middleware/auth';

const route = express.Router();

route.get('/', academicSemesterControllers.academicSemesterGetAll);

route.get('/:Id', academicSemesterControllers.academicSemesterGetId);

route.put(
  '/:Id',
  auth('admin'),
  validateRequestData(SemesterZodSchema.zodUpdatedAcademicSemesterSchema),
  academicSemesterControllers.updateAcademicSemester,
);

route.post(
  '/create-semester',
  auth('admin'),
  validateRequestData(SemesterZodSchema.zodAcademicSemesterSchema),
  academicSemesterControllers.academicSemesterCreateController,
);

export const academicRoutes = route;
