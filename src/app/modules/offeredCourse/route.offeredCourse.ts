import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { offeredCourseController } from './controller.offeredCourse';
import {
  ZodOfferedCourseSchema,
  ZodOfferedCourseUpdateSchema,
} from './validation.offeredCourse';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.post(
  '/create-offered-course',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(ZodOfferedCourseSchema),
  offeredCourseController.createOfferedCourseController,
);

route.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  offeredCourseController.getAllOfferedCourseController,
);

route.get(
  '/for-me',
  auth(User_Role.student),
  offeredCourseController.getOfferedCourseForMe,
);

route.get(
  '/:id',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  offeredCourseController.getSingleOfferedCourseController,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(ZodOfferedCourseUpdateSchema),
  offeredCourseController.updateOfferedCourseController,
);

route.delete(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  offeredCourseController.deleteOfferedCourseController,
);

export const offeredCourseRoutes = route;
