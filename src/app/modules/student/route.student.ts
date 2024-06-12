import express from 'express';
import { studentController } from './controller.student';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from './validation.student';
const route = express.Router();

route.get('/', studentController.controllerStudentGetAll);

route.patch(
  '/:id',
  validateRequestData(studentZodSchema.ZodValidationUpdatedStudentSchema),
  studentController.controllerStudentUpdated,
);

route.get('/:id', studentController.controllerStudentGetSingle);

route.delete('/:id', studentController.controllerStudentDeleted);

export const studentRoutes = route;
