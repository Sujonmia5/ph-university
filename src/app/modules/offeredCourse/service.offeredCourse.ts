import httpStatus from 'http-status';
import AppError from '../../Error/appError';
import { MSemesterRegistration } from '../semesterRegistration/model.semesterRegistration';
import {
  TOfferedCourse,
  TOfferedCourseUpdate,
} from './interface.offeredCourse';
import { MOfferedCourse } from './model.offeredCourse';
import { MAcademicDepartment } from '../academicDepartment/model.academicDepartment';
import { MCourse } from '../course/model.course';
import { MFaculty } from '../faculty/model.faculty';
import { MAcademicFaculty } from '../academicFaculty/model.academicFaculty';
import { MAcademicSemester } from '../academicSemester/model.academicSemester';
import { scheduleManagement } from './utils.offeredCourse';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    academicSemester,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isAcademicSemesterExist =
    await MAcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester is not found!');
  }

  const academicSemesterId = isAcademicSemesterExist?._id;

  const isSemesterRegistrationExist = await MSemesterRegistration.findOne({
    academicSemester: academicSemesterId,
  });

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration is not found!',
    );
  }

  const isAcademicDepartmentExist =
    await MAcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found!',
    );
  }

  const isAcademicFacultyExist =
    await MAcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty is not found!');
  }

  const isCourseExist = await MCourse.findById(course);

  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');
  }

  const isFacultyExist = await MFaculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!');
  }

  const isAcademicFacultyAndAcademicDepartmentExist =
    await MAcademicDepartment.findOne({
      _id: academicDepartment,
      academicFaculty,
    });

  if (!isAcademicFacultyAndAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicFacultyExist.name} is not belong to this ${isAcademicDepartmentExist.name}`,
    );
  }

  const semesterRegistration = isSemesterRegistrationExist._id;

  const isSameOfferedCourseWithSameSemesterRegistrationAndSameSection =
    await MOfferedCourse.findOne({
      semesterRegistration,
      section,
      course,
    });

  if (isSameOfferedCourseWithSameSemesterRegistrationAndSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course with same section is already exist!',
    );
  }

  const assignOfferedCourseSchedule = await MOfferedCourse.find({
    academicSemester,
    faculty,
    days: { $in: days },
  }).select(['endTime', 'startTime']);

  const newSchedule = {
    startTime,
    endTime,
  };

  if (scheduleManagement(assignOfferedCourseSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Faculty is not available for this time! choose other time or day',
    );
  }

  const result = await MOfferedCourse.create({
    ...payload,
    semesterRegistration,
  });

  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(MOfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.queryModel;
  const meta = await offeredCourseQuery.countTotal();
  return { meta, result };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await MOfferedCourse.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }
  return result;
};

const updateOfferedCourseFromDB = async (
  id: string,
  payload: TOfferedCourseUpdate,
) => {
  const isOfferedCourseExist = await MOfferedCourse.findById(id);

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not founded!');
  }

  const isSemesterRegistrationExist = await MSemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  );

  if (isSemesterRegistrationExist?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `you can't change ${isSemesterRegistrationExist?.status} offered course`,
    );
  }

  const isExistFaculty = await MFaculty.findById(payload.faculty);

  if (!isExistFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty is not available');
  }

  //problem 1 eid er por solve
  const assignOfferedCourseSchedule = await MOfferedCourse.find({
    faculty: payload.faculty,
    days: { $in: payload.days },
  }).select(['endTime', 'startTime']);

  const newSchedule = {
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  if (scheduleManagement(assignOfferedCourseSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Faculty is not available for this time! choose other time or day',
    );
  }

  const result = await MOfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const existOfferedCourse = await MOfferedCourse.findById(id).populate(
    'semesterRegistration',
  );

  if (!existOfferedCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not founded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existOfferedCourseStatus: any = existOfferedCourse.semesterRegistration;

  if (existOfferedCourseStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${existOfferedCourseStatus?.status}`,
    );
  }

  const result = await MOfferedCourse.findByIdAndDelete(id);
  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseFromDB,
};
