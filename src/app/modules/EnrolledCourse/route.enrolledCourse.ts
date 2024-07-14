import express from 'express';
import auth from '../../middleware/auth';
import { enrollCourseController } from './controller.enrolledCourse';
import validateRequestData from '../../middleware/validationRequest';
import {
  zodEnrolledCourse,
  zodUpdatedEnrolledCourse,
} from './validation.enrolledCourse';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.post(
  '/create',
  auth(User_Role.student),
  validateRequestData(zodEnrolledCourse),
  enrollCourseController.createEnrollCourse,
);

route.get(
  '/my-enroll-courses',
  auth(User_Role.student),
  enrollCourseController.myEnrolledCourse,
);

route.patch(
  '/updated-enroll-course-marks',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  validateRequestData(zodUpdatedEnrolledCourse),
  enrollCourseController.updatedEnrollCourse,
);

export const enrollCourseRoutes = route;
