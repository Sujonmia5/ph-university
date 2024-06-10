import express from 'express';
import { academicSemesterControllers } from './controller.academicSemester';
import validateRequestData from '../../middleware/validationRequest';
import { SemesterZodSchema } from './validation.academicSemester';

const route = express.Router();

route.get('/', academicSemesterControllers.academicSemesterGetAll);
route.get('/:Id', academicSemesterControllers.academicSemesterGetId);
route.put(
  '/:Id',
  validateRequestData(SemesterZodSchema.zodUpdatedAcademicSemesterSchema),
  academicSemesterControllers.updateAcademicSemester,
);

route.post(
  '/create-semester',
  validateRequestData(SemesterZodSchema.zodAcademicSemesterSchema),
  academicSemesterControllers.academicSemesterCreateController,
);

export const academicRoutes = route;
