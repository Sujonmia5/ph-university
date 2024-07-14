import express from 'express';
import { semesterRegistrationController } from './controller.semesterRegistration';
import validateRequestData from '../../middleware/validationRequest';
import { zodSemesterRegistrationSchema } from './validation.semesterRegistration';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.post(
  '/create-semester-registration',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(zodSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);
route.get(
  '/',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);

route.get(
  '/:id',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  semesterRegistrationController.updatedSemesterRegistration,
);

export const semesterRegistrationRoutes = route;
