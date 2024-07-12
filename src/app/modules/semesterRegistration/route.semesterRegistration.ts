import express from 'express';
import { semesterRegistrationController } from './controller.semesterRegistration';
import validateRequestData from '../../middleware/validationRequest';
import { zodSemesterRegistrationSchema } from './validation.semesterRegistration';
import auth from '../../middleware/auth';

const route = express.Router();

route.post(
  '/create-semester-registration',
  auth('admin'),
  validateRequestData(zodSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);
route.get('/', semesterRegistrationController.getAllSemesterRegistration);

route.get('/:id', semesterRegistrationController.getSingleSemesterRegistration);

route.patch(
  '/:id',
  auth('admin'),
  semesterRegistrationController.updatedSemesterRegistration,
);

export const semesterRegistrationRoutes = route;
