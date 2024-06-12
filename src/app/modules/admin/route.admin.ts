import express from 'express';
import { adminController } from './controller.admin';

const route = express.Router();
route.get('/', adminController.getAllAdminController);
route.get('/:id', adminController.getSingleAdminController);
route.patch('/:id', adminController.updateAdminController);
route.delete('/:id', adminController.deletedSingleAdminController);

export const adminRoutes = route;
