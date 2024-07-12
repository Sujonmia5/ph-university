import { Router } from 'express';
import { userRoutes } from '../modules/user/route.user';
import { studentRoutes } from '../modules/student/route.student';
import { academicRoutes } from '../modules/academicSemester/route.academicSemester';
import { academicFacultyRoutes } from '../modules/academicFaculty/route.academicFaculty';
import { academicDepartmentRoutes } from '../modules/academicDepartment/route.academicDepartment';
import { facultyRoutes } from '../modules/faculty/route.faculty';
import { adminRoutes } from '../modules/admin/route.admin';
import { courseRoutes } from '../modules/course/route.course';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/route.semesterRegistration';
import { offeredCourseRoutes } from '../modules/offeredCourse/route.offeredCourse';
import { authRoutes } from '../modules/Auth/route.auth';
import { enrollCourseRoutes } from '../modules/EnrolledCourse/route.enrolledCourse';

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
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
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
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/enroll-courses',
    route: enrollCourseRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
