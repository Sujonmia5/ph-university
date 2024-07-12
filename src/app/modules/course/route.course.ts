import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import {
  zodCourseFacultySchema,
  zodCourseSchema,
  zodUpdatedSchema,
} from './validation.course';
import { courseController } from './controller.course';
import auth from '../../middleware/auth';

const route = express.Router();

route.post(
  '/create-course',
  auth('admin'),
  validateRequestData(zodCourseSchema),
  courseController.createCourseController,
);

route.get('/', courseController.getAllCourseController);
route.get('/:id', courseController.getSingleCourseController);
route.patch(
  '/:id',
  auth('admin'),
  validateRequestData(zodUpdatedSchema),
  courseController.updatedCourseController,
);
route.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequestData(zodCourseFacultySchema),
  courseController.assignCourseFacultyController,
);
route.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequestData(zodCourseFacultySchema),
  courseController.removeCourseFacultyController,
);
route.delete('/:id', auth('admin'), courseController.deletedCourseController);

export const courseRoutes = route;
