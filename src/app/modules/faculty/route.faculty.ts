import express from 'express';
import { facultyController } from './controller.faculty';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.get(
  '/',
  auth(User_Role.admin),
  facultyController.getAllFacultyController,
);

route.get(
  '/:id',
  auth(User_Role.admin),
  facultyController.getSingleFacultyController,
);

route.patch(
  '/:id',
  auth(User_Role.faculty),
  facultyController.updateSingleFacultyController,
);

route.delete('/:id', facultyController.deleteSingleFacultyController);

export const facultyRoutes = route;
