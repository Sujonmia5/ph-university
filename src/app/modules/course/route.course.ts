import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import {
  zodCourseFacultySchema,
  zodCourseSchema,
  zodUpdatedSchema,
} from './validation.course';
import { courseController } from './controller.course';

const route = express.Router();

route.post(
  '/create-course',
  validateRequestData(zodCourseSchema),
  courseController.createCourseController,
);

route.get('/', courseController.getAllCourseController);
route.get('/:id', courseController.getSingleCourseController);
route.patch(
  '/:id',
  validateRequestData(zodUpdatedSchema),
  courseController.updatedCourseController,
);
route.put(
  '/:courseId/assign-faculties',
  validateRequestData(zodCourseFacultySchema),
  courseController.assignCourseFacultyController,
);
route.delete(
  '/:courseId/remove-faculties',
  validateRequestData(zodCourseFacultySchema),
  courseController.removeCourseFacultyController,
);
route.delete('/:id', courseController.deletedCourseController);

export const courseRoutes = route;
