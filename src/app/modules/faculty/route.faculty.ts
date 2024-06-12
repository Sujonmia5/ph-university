import express from 'express';
import { facultyController } from './controller.faculty';

const route = express.Router();

route.get('/', facultyController.getAllFacultyController);
route.get('/:id', facultyController.getSingleFacultyController);
route.patch('/:id', facultyController.updateSingleFacultyController);
route.delete('/:id', facultyController.deleteSingleFacultyController);

export const facultyRoutes = route;
