import { Router } from 'express';
import { userRoutes } from '../modules/user/route.user';
import { studentRoutes } from '../modules/student/route.student';
import { academicRoutes } from '../modules/academicSemester/route.academicSemester';
import { academicFacultyRoutes } from '../modules/academicFaculty/route.academicFaculty';
import { academicDepartmentRoutes } from '../modules/academicDepartment/route.academicDepartment';

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
