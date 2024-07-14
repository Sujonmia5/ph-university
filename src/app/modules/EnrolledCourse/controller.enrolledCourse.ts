import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { enrollCourseService } from './service.enrolledCourse';

const createEnrollCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const offeredCourse = req.body.offeredCourse;
  const result = await enrollCourseService.createEnrollCourseIntoDB(
    user.id,
    offeredCourse,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course enrolled successfully',
    data: result,
  });
});
const myEnrolledCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const result = await enrollCourseService.myEnrolledCourseFromDB(
    user.id,
    query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course enrolled successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updatedEnrollCourse = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const result = await enrollCourseService.updatedEnrollCourseIntoDB(
    userId,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated successfully',
    data: result,
  });
});

export const enrollCourseController = {
  createEnrollCourse,
  updatedEnrollCourse,
  myEnrolledCourse,
};
