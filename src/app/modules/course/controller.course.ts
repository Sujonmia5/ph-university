import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { courseService } from './service.course';

const createCourseController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await courseService.createdCourseIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourseController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseService.getAllCourseFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetch successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCourseController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetch successfully',
    data: result,
  });
});
const deletedCourseController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseService.deletedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const updatedCourseController = catchAsync(async (req, res) => {
  const id = await req.params.id;
  const data = await req.body;
  const result = await courseService.updateCourseIntoDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const assignCourseFacultyController = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const data = req.body;
  const result = await courseService.assignCourseFacultyIntoDB(courseId, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assign Course faculties successfully',
    data: result,
  });
});

const getCourseFacultyController = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseService.getCourseFacultyFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assign Course faculties successfully',
    data: result,
  });
});

const removeCourseFacultyController = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const data = req.body;
  const result = await courseService.removeCourseFacultyIntoDB(courseId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove faculties from Course successfully',
    data: result,
  });
});

export const courseController = {
  createCourseController,
  getAllCourseController,
  getSingleCourseController,
  deletedCourseController,
  updatedCourseController,
  assignCourseFacultyController,
  removeCourseFacultyController,
  getCourseFacultyController,
};
