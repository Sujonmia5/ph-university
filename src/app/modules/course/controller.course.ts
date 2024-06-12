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
    data: result,
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

export const courseController = {
  createCourseController,
  getAllCourseController,
  getSingleCourseController,
  deletedCourseController,
  updatedCourseController,
};
