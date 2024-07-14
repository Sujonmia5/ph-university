import express from 'express';
import validateRequestData from '../../middleware/validationRequest';
import {
  zodCourseFacultySchema,
  zodCourseSchema,
  zodUpdatedSchema,
} from './validation.course';
import { courseController } from './controller.course';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.post(
  '/create-course',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(zodCourseSchema),
  courseController.createCourseController,
);

route.get(
  '/',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  courseController.getAllCourseController,
);

route.get(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.faculty),
  courseController.getSingleCourseController,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(zodUpdatedSchema),
  courseController.updatedCourseController,
);
route.put(
  '/:courseId/assign-faculties',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(zodCourseFacultySchema),
  courseController.assignCourseFacultyController,
);

route.delete(
  '/:courseId/remove-faculties',
  auth(User_Role.superAdmin, User_Role.admin),
  validateRequestData(zodCourseFacultySchema),
  courseController.removeCourseFacultyController,
);

route.get(
  '/:courseId/get-faculties',
  auth(
    User_Role.superAdmin,
    User_Role.admin,
    User_Role.faculty,
    User_Role.student,
  ),
  courseController.getCourseFacultyController,
);

route.delete(
  '/:id',
  auth(User_Role.superAdmin, User_Role.admin),
  courseController.deletedCourseController,
);

export const courseRoutes = route;
