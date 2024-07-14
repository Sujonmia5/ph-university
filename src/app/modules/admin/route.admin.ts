import express from 'express';
import { adminController } from './controller.admin';
import auth from '../../middleware/auth';
import { User_Role } from '../user/constants.user';

const route = express.Router();

route.get(
  '/',
  auth(User_Role.superAdmin),
  adminController.getAllAdminController,
);

route.get(
  '/:id',
  auth(User_Role.superAdmin),
  adminController.getSingleAdminController,
);

route.patch(
  '/:id',
  auth(User_Role.superAdmin),
  adminController.updateAdminController,
);

route.delete(
  '/:id',
  auth(User_Role.superAdmin),
  adminController.deletedSingleAdminController,
);

export const adminRoutes = route;
