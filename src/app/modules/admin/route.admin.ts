import express from 'express';
import { adminController } from './controller.admin';
import auth from '../../middleware/auth';

const route = express.Router();
route.get('/', auth('superAdmin'), adminController.getAllAdminController);
route.get('/:id', auth('superAdmin'), adminController.getSingleAdminController);
route.patch('/:id', auth('superAdmin'), adminController.updateAdminController);
route.delete(
  '/:id',
  auth('superAdmin'),
  adminController.deletedSingleAdminController,
);

export const adminRoutes = route;
