import { Router } from 'express';
import { userRoutes } from '../user/route.user';
import { academicRoutes } from '../academicSemester/route.academicSemester';
import { studentRoutes } from '../student/route.student';
import { academicFacultyRoutes } from '../academicFaculty/route.academicFaculty';
import { academicDepartmentRoutes } from '../academicDepartment/route.academicDepartment';

type TRoute = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoute: TRoute[] = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
