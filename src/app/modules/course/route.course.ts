import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { zodCourseSchema, zodUpdatedSchema } from './validation.course';
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
route.delete('/:id', courseController.deletedCourseController);

export const courseRoutes = route;
