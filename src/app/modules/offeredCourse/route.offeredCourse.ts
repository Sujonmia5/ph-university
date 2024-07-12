import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import { offeredCourseController } from './controller.offeredCourse';
import {
  ZodOfferedCourseSchema,
  ZodOfferedCourseUpdateSchema,
} from './validation.offeredCourse';
import auth from '../../middleware/auth';

const route = express.Router();

route.post(
  '/create-offered-course',
  auth('admin'),
  validateRequestData(ZodOfferedCourseSchema),
  offeredCourseController.createOfferedCourseController,
);
route.get('/', offeredCourseController.getAllOfferedCourseController);
route.get('/:id', offeredCourseController.getSingleOfferedCourseController);

route.patch(
  '/:id',
  auth('admin'),
  validateRequestData(ZodOfferedCourseUpdateSchema),
  offeredCourseController.updateOfferedCourseController,
);

route.delete(
  '/:id',
  auth('admin'),
  offeredCourseController.deleteOfferedCourseController,
);
export const offeredCourseRoutes = route;
