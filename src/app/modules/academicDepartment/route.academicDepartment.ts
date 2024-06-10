import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { academicDepartmentZodSchema } from './validation.academicDepartment';
import { academicDepartmentController } from './controller.academicDepartment';
const route = express.Router();

route.post(
  '/create-academic-department',
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
  validateRequestData(
    academicDepartmentZodSchema.zodUpdatedAcademicDepartmentSchema,
  ),
  academicDepartmentController.updateAcademicDepartmentController,
);

export const academicDepartmentRoutes = route;
