import express from 'express';
import { studentController } from './controller.student';
import validateRequestData from '../../middleware/validationRequest';
import { studentZodSchema } from './validation.student';
const route = express.Router();

route.get('/', studentController.controllerStudentGetAll);

route.patch(
  '/:studentId',
  validateRequestData(studentZodSchema.ZodValidationUpdatedStudentSchema),
  studentController.controllerStudentUpdated,
);

route.get('/:studentId', studentController.controllerStudentGetSingle);

route.delete('/:studentId', studentController.controllerStudentDeleted);

export const studentRoutes = route;
