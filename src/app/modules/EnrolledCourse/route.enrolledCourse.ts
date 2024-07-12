import express from 'express';
import auth from '../../middleware/auth';
import { enrollCourseController } from './controller.enrolledCourse';
import validateRequestData from '../../middleware/validationRequest';
import {
  zodEnrolledCourse,
  zodUpdatedEnrolledCourse,
} from './validation.enrolledCourse';

const route = express.Router();

route.post(
  '/create',
  auth('student'),
  validateRequestData(zodEnrolledCourse),
  enrollCourseController.createEnrollCourse,
);

route.patch(
  '/updated-enroll-course-marks',
  auth('faculty'),
  validateRequestData(zodUpdatedEnrolledCourse),
  enrollCourseController.updatedEnrollCourse,
);

export const enrollCourseRoutes = route;
