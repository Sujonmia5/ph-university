import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { academicDepartmentZodSchema } from './validation.academicDepartment';
import { academicDepartmentController } from './controller.academicDepartment';
import auth from '../../middleware/auth';
const route = express.Router();

route.post(
  '/create-academic-department',
  auth('admin'),
  validateRequestData(academicDepartmentZodSchema.zodAcademicDepartmentSchema),
  academicDepartmentController.createAcademicDepartmentController,
);

route.get('/', academicDepartmentController.getAllAcademicDepartmentController);

route.get(
  '/:id',
  academicDepartmentController.getSingleAcademicDepartmentController,
);
route.patch(
  '/:id',
  auth('admin'),
  validateRequestData(
    academicDepartmentZodSchema.zodUpdatedAcademicDepartmentSchema,
  ),
  academicDepartmentController.updateAcademicDepartmentController,
);

export const academicDepartmentRoutes = route;
